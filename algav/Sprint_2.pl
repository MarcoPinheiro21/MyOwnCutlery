:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/json)).

:- dynamic type_of_machine/2.
:- dynamic operationtype/3.
:- dynamic operation/2.
:- dynamic machine_type_operation/3.
:- dynamic machines_of_line/2.
:- dynamic product_plan/2.
:- dynamic temp_product/2.
:- dynamic order/4.

get_machine_types(JSON) :-
   setup_call_cleanup(
       http_open('http://localhost:5000/factoryapi/machines/types', StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).

get_machines_of_type(T,JSON) :-
   atom_concat('http://localhost:5000/factoryapi/machines?type=',T,URL),
   setup_call_cleanup(
       http_open(URL, StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).

get_production_lines(JSON) :-
   setup_call_cleanup(
       http_open('http://localhost:5000/factoryapi/productionlines', StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).
get_product(JSON) :-
   setup_call_cleanup(
       http_open('http://localhost:8091/productionapi/products', StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).
get_plan_of_product(T,JSON) :-
   atom_concat(T,'/plan',PLAN),
   atom_concat('http://localhost:8091/productionapi/products/',PLAN,URL),
   setup_call_cleanup(
       http_open(URL, StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).
get_encomendas(JSON):-
   setup_call_cleanup(
       http_open('http://localhost:4000/ordersapi/orders/', StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ).

get_client_priority(ID,P):-
   atom_concat('http://localhost:4000/ordersapi/customers/',ID,URL),
   setup_call_cleanup(
       http_open(URL, StreamIn,
           [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
       json_read_dict(StreamIn, JSON),
       close(StreamIn)
   ),
   P=JSON.priority.



server(Port) :-
        http_server(http_dispatch, [port(Port)]).
/*POST TRABALHO*/

:- http_handler('/create_facts', register_dynamic_facts, []).

register_dynamic_facts(_) :-
    get_machine_types(JSON),
    comeca_split_parametros(JSON,R,OPL),
    assert_machines_of_type(R),
    assert_operations_of_machine_type(OPL),
    assert_production_lines,
    assert_product,
    assert_encomendas,
    format('Content-type: text/plain~n~n'),
    format("Success").


comeca_split_parametros(Lista,R,OPL):-
    retractall(type_of_machine(_,_)),
    retractall(operationtype(_,_,_)),
    retractall(operation(_,_)),
    retractall(machine_type_operation(_,_,_)),
    retractall(machines_of_line(_,_)),
    retractall(product_plan(_,_)),
    retractall(order(_,_,_,_)),
    split_parametros(Lista,R,OPL).

split_parametros([],[],[]).
split_parametros([H|T],[RH|RT],[OPLH|OPLT]):-
    MH = H.desc,
    TY = H.id,
    OPLH= p(MH,H.operationList),
    RH=p(MH,TY),
    split_parametros(T,RT,OPLT).


assert_machines_of_type([]).
assert_machines_of_type([p(HD,HI)|T]):-
    get_machines_of_type(HI,JSON),
    assert_type_machine_connection(HD,JSON),
    assert_machines_of_type(T).

assert_type_machine_connection(_,[]).
assert_type_machine_connection(D,[H|T]):-
    assert(type_of_machine(H.description,D)),
    assert_type_machine_connection(D,T).

assert_operations_of_machine_type([]).
assert_operations_of_machine_type([p(MT,OL)|T]):-
   assert_operationlist(MT,OL),
   assert_operations_of_machine_type(T).
assert_operationlist(_,[]).
assert_operationlist(T,[LH|LT]):-
   TOOL = LH.tool,
   OPT=LH.operationType.desc,
   OPTET=LH.operationType.executionTime,
   OPTST=LH.operationType.setupTime,
   (operationtype(OPT,OPTET,OPTST) -> true ; assert(operationtype(OPT,OPTET,OPTST))),
   (operation(TOOL,OPT) -> true ; assert(operation(TOOL,OPT))),
   assert(machine_type_operation(T,TOOL,OPT)),
   assert_operationlist(T,LT).

assert_production_lines:-
    get_production_lines(JSON),
    assert_machines_of_pl(JSON).

assert_machines_of_pl([]).
assert_machines_of_pl([H|T]):-
    N=H.productionLineName,
    assert_machines(H.machinesListDtos,L),
    assert(machines_of_line(N,L)),
    assert_machines_of_pl(T).

assert_machines([],[]).
assert_machines([H|T],[RH|RT]):-
   RH=H.description,
   assert_machines(T,RT).

assert_product:-
   get_product(JSON),
   split_product_params(JSON,P),
   assert_product_params(P).

split_product_params([],[]).
split_product_params([H|T],[p(I,N)|RT]):-
   I=H.productId,
   N=H.productName,
   assert(temp_product(I,N)),
   split_product_params(T,RT).

assert_product_params([]).
assert_product_params([p(I,N)|T]):-
   get_plan_of_product(I,JSON),
   create_plan(JSON,L),
   assert(product_plan(N,L)),
   assert_product_params(T).

create_plan([],[]).
create_plan([H|T],[p(TOOL,OT)|RT]):-
   TOOL = H.tool,
   OT= H.operationType,
   create_plan(T,RT).

assert_encomendas:-
   get_encomendas(JSON),
   assert_encomenda(JSON),
   retractall(temp_product(_,_)).

assert_encomenda([]).
assert_encomenda([H|T]):-
   C=H.customerDetails.id,
   make_list_produtos_encomendados(H.products,L),
   format_date(H.deliveryDate,D),
   get_client_priority(C,P),
   assert(order(C,L,D,P)),
   assert_encomenda(T).

make_list_produtos_encomendados([],[]).
make_list_produtos_encomendados([H|T],[p(P,Q)|RT]):-
   number_string(N,H.id),
   temp_product(N,P),
   number_string(Q,H.quantity),
   make_list_produtos_encomendados(T,RT).

format_date(T,R):-
   parse_time(T,iso_8601,TC),
   get_time(TN),
   R is TC-TN.


% -----------------------------------------------------------------------
% -----------------------------------------------------------------------


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic tarefa/4.
% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).

% tarefas(NTarefas).
tarefas(5).

% parameteriza
inicializa:-
   (retract(geracoes(_));true),asserta(geracoes(4)),
   (retract(populacao(_));true),asserta(populacao(3)),
   (retract(prob_cruzamento(_));true),asserta(prob_cruzamento(0.8)),
   (retract(prob_mutacao(_));true),asserta(prob_mutacao(0.8)).


gera:-
   findall(p(LP,TC,P),(order(_,LP,TC,P)),LE),
   gera_tarefas(LE),
   findall(T,tarefa(T,_,_,_),LT),

   inicializa,

   gera_populacao(LT,Pop),

   avalia_populacao(Pop,PopAv),
   ordena_populacao(PopAv,PopOrd),
   geracoes(NG),
   gera_geracao(0,NG,PopOrd).

% ------------------------------------------------------------------------
% ------------------------------------------------------------------------

gera_tarefas(LE):-
   retractall(tarefa(_,_,_,_)),
   lotes(LE,LP),
   assert_tarefas(LP,_).

makespan([],0,0,0).
makespan([p(_,OT)|T],MTS,MTE,MS):-
   makespan(T,MTS1,MTE1,MS1),
   operationtype(OT,TE,TS),
   X is MS1-TS,
   ((X>MTS1,MTS is MTS1);(X=<MTS1,MTS is X)),
   ((TE=<MTE1,MTE is MTE1);(TE>MTE1,MTE is TE)),
   MS is MS1 + TE.

assert_tarefas([],1).
assert_tarefas([p(P,Q,TC,PR)|T],C):-
   assert_tarefas(T,C1),
   product_plan(P,PL),
   reverse(PL,RVPL),
   makespan(RVPL,MTS,MTE,MS),
   abs(MTS,ABS),
   MST is MS + (MTE*(Q-1)) + ABS,
   string_concat("t",C1,I),
   assert(tarefa(I,MST,TC,PR)),
   C is C1+1.

lotes([],[]).
lotes([p(L,TC,P)|T],R):-
   lotes_encomenda(L,TC,P,R1),
   lotes(T,R2),
   append(R1,R2,R).

lotes_encomenda([],_,_,[]).
lotes_encomenda([p(P,Q)|T],TC,PR,[p(P,Q,TC,PR)|R]):-
   lotes_encomenda(T,TC,PR,R).

% ------------------------------------------------------------------------
% ------------------------------------------------------------------------

gera_populacao(LT,[A,B,C]):-
   length(LT,NT),
   spt(LT,A),
   edd(LT,EDD),
   ((member(EDD, [A]),gera_random(LT,NT,[A],B));(\+member(EDD, [A]),B=EDD)),
   pco(LT,PCO),
   ((member(PCO, [A,B]),gera_random(LT,NT,[A,B],C));(\+member(PCO, [A,B]),C=PCO)).


gera_random(LT,NT,LI,R):-
   gera_individuo(LT,NT,I),
   ((member(I,LI),gera_random(LT,NT,LI,R));(\+member(I,LI),R=I)).

gera_individuo([G],1,[G]):-!.
gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

spt(L,LR):-
    sort_by_makespan(L, LR).
sort_by_makespan(List,Sorted):-
    msort(List,[],Sorted),!.
msort([],Acc,Acc).
msort([H|T],Acc,Sorted):-
    minsert(H,Acc,NAcc),
    msort(T,NAcc,Sorted).
minsert(X,[Y|T],[Y|NT]):-
    tarefa(X,MSPX,_,_),
    tarefa(Y,MSPY,_,_),
    MSPX > MSPY,
    minsert(X,T,NT).
minsert(X,[Y|T],[X,Y|T]):-
    tarefa(X,MSPX,_,_),
    tarefa(Y,MSPY,_,_),
    MSPX =< MSPY.
minsert(X,[],[X]).

edd(L,LR):-
   sort_by_due_date(L, LR).
sort_by_due_date(List,Sorted):-
   eddsort(List,[],Sorted),!.
eddsort([],Acc,Acc).
eddsort([H|T],Acc,Sorted):-
   eddinsert(H,Acc,NAcc),
   eddsort(T,NAcc,Sorted).
eddinsert(X,[Y|T],[Y|NT]):-
   tarefa(X,_,TCX,_),
   tarefa(Y,_,TCY,_),
   TCX>TCY,
   eddinsert(X,T,NT).
eddinsert(X,[Y|T],[X,Y|T]):-
   tarefa(X,_,TCX,_),
   tarefa(Y,_,TCY,_),
   TCX=<TCY.
eddinsert(X,[],[X]).

pco(L,LR):-
   sort_by_priority(L, LR).
sort_by_priority(List,Sorted):-
   pcosort(List,[],Sorted),!.
pcosort([],Acc,Acc).
pcosort([H|T],Acc,Sorted):-
   pcoinsert(H,Acc,NAcc),
   pcosort(T,NAcc,Sorted).
pcoinsert(X,[Y|T],[Y|NT]):-
   tarefa(X,_,_,PRX),
   tarefa(Y,_,_,PRY),
   PRX>PRY,
   pcoinsert(X,T,NT).
pcoinsert(X,[Y|T],[X,Y|T]):-
   tarefa(X,_,_,PRX),
   tarefa(Y,_,_,PRY),
   PRX=<PRY.
pcoinsert(X,[],[X]).


% ------------------------------------------------------------------------
% ------------------------------------------------------------------------

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	((InstFim =< Prazo,!, VT is 0);(VT is (InstFim-Prazo)*Pen)),
	V is VT+VResto.


% ------------------------------------------------------------------------
% ------------------------------------------------------------------------


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


% ------------------------------------------------------------------------
% ------------------------------------------------------------------------


gera_geracao(G,G,Pop):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop):-
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	N1 is N+1,
	gera_geracao(N1,G,NPopOrd).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

%--------------------------------------------------------





