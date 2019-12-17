:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/json)).

:- dynamic type_of_machine/2.
:- dynamic operationtype/3.
:- dynamic operation/2.
:- dynamic machine_type_operation/2.
:- dynamic machines_of_line/2.
:- dynamic product_plan/2.
:- dynamic temp_product/2.
:- dynamic order/5.


% -----------VV DYNAMIC CREATION OF FACTS USING DATABASE VV--------------
% -----------------------------------------------------------------------


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

:- http_handler('/production_plan', register_dynamic_facts, [methods([get])]).

register_dynamic_facts(_) :-
    get_machine_types(JSON),
    comeca_split_parametros(JSON,R,OPL),
    assert_machines_of_type(R),
    assert_operations_of_machine_type(OPL),
    assert_production_lines,
    assert_product,
    assert_encomendas,
    format('Content-type: text/plain~n~n'),
    planeamento,
    format("Success").


comeca_split_parametros(Lista,R,OPL):-
    retractall(type_of_machine(_,_)),
    retractall(operationtype(_,_,_)),
    retractall(operation(_,_)),
    retractall(machine_type_operation(_,_)),
    retractall(machines_of_line(_,_)),
    retractall(product_plan(_,_)),
    retractall(order(_,_,_,_,_)),
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
   ((H.active == true,assert(type_of_machine(H.description,D)),assert_type_machine_connection(D,T))
   ;(assert_type_machine_connection(D,T))).

assert_operations_of_machine_type([]).
assert_operations_of_machine_type([p(MT,OL)|T]):-
   assert_operationlist(MT,OL),
   assert_operations_of_machine_type(T).
assert_operationlist(_,[]).
assert_operationlist(MT,[LH|LT]):-
   TOOL = LH.tool,
   OPT=LH.operationType.desc,
   OPTET=LH.operationType.executionTime,
   OPTST=LH.operationType.setupTime,
   assert(operationtype(OPT,OPTET,OPTST)),
   assert(operation(OPT,TOOL)),
   assert(machine_type_operation(MT,p(OPT,TOOL))),
   assert_operationlist(MT,LT).

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
create_plan([H|T],[p(OT,TOOL)|RT]):-
   TOOL = H.tool,
   OT= H.operationType,
   create_plan(T,RT).

assert_encomendas:-
   get_encomendas(JSON),
   assert_encomenda(JSON),
   retractall(temp_product(_,_)).

assert_encomenda([]).
assert_encomenda([H|T]):-
   ID= H.'_id',
   C=H.customerDetails.id,
   make_list_produtos_encomendados(H.products,LP),
   format_date(H.deliveryDate,D),
   get_client_priority(C,PR),
   assert(order(ID,C,LP,D,PR)),
   assert_encomenda(T).

make_list_produtos_encomendados([],[]).
make_list_produtos_encomendados([H|T],[p(P,Q)|RT]):-
   number_string(N,H.id),
   temp_product(N,P),
   Q=H.quantity,
   make_list_produtos_encomendados(T,RT).

format_date(T,R):-
   parse_time(T,iso_8601,TC),
   get_time(TN),
   R is TC-TN.


% --------VV DYNAMIC CREATION OF FACTS FROM STATIC VALUES VV-------------
% -----------------------------------------------------------------------


register_dynamic_facts_offline:-

    retractall(type_of_machine(_,_)),
    retractall(operationtype(_,_,_)),
    retractall(operation(_,_)),
    retractall(machine_type_operation(_,_)),
    retractall(machines_of_line(_,_)),
    retractall(product_plan(_,_)),
    retractall(order(_,_,_,_,_)),

    assert(type_of_machine("ma","t1")),
    assert(type_of_machine("mb","t2")),
    assert(type_of_machine("mc","t3")),
    assert(type_of_machine("md","t4")),
    assert(type_of_machine("me","t2")),
    assert(type_of_machine("mf","t6")),
    assert(type_of_machine("mg","t8")),
    assert(type_of_machine("mh","t7")),
    assert(type_of_machine("mi","t5")),
    assert(type_of_machine("mj","t6")),
    assert(type_of_machine("mk","t2")),
    assert(type_of_machine("ml","t3")),
    assert(type_of_machine("mm","t1")),
    assert(type_of_machine("mn","t2")),
    assert(type_of_machine("mo","t6")),
    assert(type_of_machine("mp","t8")),

    assert(operation("opt1","fa")),
    assert(operation("opt2","fb")),
    assert(operation("opt1","fb")),
    assert(operation("opt2","fc")),
    assert(operation("opt3","fc")),
    assert(operation("opt3","fd")),
    assert(operation("opt4","fa")),
    assert(operation("opt5","fe")),
    assert(operation("opt6","ff")),
    assert(operation("opt5","fc")),
    assert(operation("opt6","fb")),
    assert(operation("opt7","fa")),
    assert(operation("opt1","fd")),
    assert(operation("opt8","fa")),
    assert(operation("opt5","fa")),

    assert(machine_type_operation("t1",p("opt1","fa"))),
    assert(machine_type_operation("t1",p("opt2","fb"))),
    assert(machine_type_operation("t1",p("opt5","fe"))),
    assert(machine_type_operation("t2",p("opt1","fb"))),
    assert(machine_type_operation("t2",p("opt2","fc"))),
    assert(machine_type_operation("t2",p("opt6","ff"))),
    assert(machine_type_operation("t3",p("opt2","fb"))),
    assert(machine_type_operation("t3",p("opt2","fc"))),
    assert(machine_type_operation("t3",p("opt5","fc"))),
    assert(machine_type_operation("t4",p("opt3","fc"))),
    assert(machine_type_operation("t4",p("opt6","fb"))),
    assert(machine_type_operation("t5",p("opt1","fb"))),
    assert(machine_type_operation("t5",p("opt4","fa"))),
    assert(machine_type_operation("t5",p("opt7","fa"))),
    assert(machine_type_operation("t6",p("opt3","fd"))),
    assert(machine_type_operation("t6",p("opt1","fd"))),
    assert(machine_type_operation("t6",p("opt5","fc"))),
    assert(machine_type_operation("t7",p("opt1","fa"))),
    assert(machine_type_operation("t7",p("opt3","fd"))),
    assert(machine_type_operation("t7",p("opt8","fa"))),
    assert(machine_type_operation("t8",p("opt1","fb"))),
    assert(machine_type_operation("t8",p("opt3","fc"))),
    assert(machine_type_operation("t8",p("opt5","fa"))),

    assert(machines_of_line("l1",["ma","mb","mc","md"])),
    assert(machines_of_line("l2",["me","mf","mg","mh"])),
    assert(machines_of_line("l3",["mi","mj","mk","ml"])),
    assert(machines_of_line("l4",["mm","mn","mo","mp"])),

    %order(CLIENTE,[p(PRODUTO,QUANTIDADE)],DATA LIMITE, PRIORIDADE)
    assert(order(o1,"c1",[p("p1",5),p("p3",7)],420,5)),
    assert(order(o2,"c2",[p("p2",2),p("p3",3),p("p5",3)],340,3)),
    assert(order(o3,"c3",[p("p2",6),p("p4",5)],260,2)),
    assert(order(o4,"c4",[p("p1",5),p("p3",7)],420,5)),
    assert(order(o5,"c5",[p("p2",2),p("p3",3),p("p5",3)],340,1)),
    assert(order(o6,"c6",[p("p2",6),p("p4",5)],260,2)),
    assert(order(o7,"c7",[p("p1",5),p("p3",7)],420,5)),
    assert(order(o8,"c8",[p("p2",2),p("p3",3),p("p5",3)],340,4)),
    assert(order(o9,"c9",[p("p2",6),p("p4",5)],260,2)),


    %product_plan(PRODUTO,[p(TOOL,OPERATION TYPE)])
    assert(product_plan("p1",[p("opt1","fa"),p("opt1","fb"),p("opt6","fb")])),
    assert(product_plan("p2",[p("opt1","fa"),p("opt1","fb"),p("opt2","fc"),p("opt3","fc")])),
    assert(product_plan("p3",[p("opt5","fe"),p("opt6","ff"),p("opt3","fd"),p("opt1","fb"),p("opt3","fc")])),
    assert(product_plan("p4",[p("opt7","fa"),p("opt1","fd"),p("opt2","fb")])),
    assert(product_plan("p5",[p("opt2","fc"),p("opt1","fd"),p("opt3","fc"),p("opt8","fa")])),

    %operationtype(NOME,T.EXECUCAO,T.SETUP)
    assert(operationtype("opt1",36,11)),
    assert(operationtype("opt2",40,10)),
    assert(operationtype("opt3",34,13)),
    assert(operationtype("opt4",27,8)),
    assert(operationtype("opt5",60,5)),
    assert(operationtype("opt6",30,6)),
    assert(operationtype("opt7",40,8)),
    assert(operationtype("opt8",42,9)).


% ------------VV INITIAL ITERATION OF GENETIC ALGORITHM VV---------------
% -----------------------------------------------------------------------


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic tarefa/6.
:-dynamic tarefas/1.
% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).

% parameteriza
planeamento:-
   findall(p(ID,LP,TC,P),(order(_,ID,LP,TC,P)),LE),
   gera_tarefas(LE,LT),
   findall(LP*0,machines_of_line(LP,_),LLP),
   atribuir_tarefa_a_linha(LT,LLP),
   gera_todos(LLP).

gera_todos([]).
gera_todos([H*_|T]):-
   gera(H),
   gera_todos(T).

atribuir_tarefa_a_linha(LT,LLP):-
   sortTC(LT,LSorted),
   linhas_possiveis_tarefas(LSorted,LLP,R),
   atribui(LLP,R).

atribui(_,[]).
atribui(LLP,[q(_,_,_,_,_,_)*[]|T]):-
   atribui(LLP,T).
atribui(LLP,[q(I,ID,MS,TC,PR,_)*[LPH|LPT]|T]):-
   length([LPH|LPT],N),
   ((N==1,assert(tarefa(I,ID,MS,TC,PR,LPH)),acumular_makespan(LLP,LPH,MS,NLLP),atribui(NLLP,T));
   (bsort(LLP,SLLP),heuristica_balanceamento(SLLP,q(I,ID,MS,TC,PR,_)*[LPH|LPT],NLLP),atribui(NLLP,T))).

heuristica_balanceamento([H*A|T],q(I,ID,MS,TC,PR,_)*L,[H*A1|RT]):-
   ((member(H,L),assert(tarefa(I,ID,MS,TC,PR,H)),A1 is A+MS,RT=T);
   (A1=A,heuristica_balanceamento(T,q(I,ID,MS,TC,PR,_)*L,RT))).


acumular_makespan([],_,_,[]).
acumular_makespan([H*Q|T],H,MS,[H*Q1|RT]):-
   Q1 is Q+MS,
   acumular_makespan(T,H,MS,RT).
acumular_makespan([H*Q|T],LEscolhida,MS,[H*Q|RT]):-
   acumular_makespan(T,LEscolhida,MS,RT).

linhas_possiveis_tarefas([],_,[]).
linhas_possiveis_tarefas([H|T],LLP,R):-
   linhas_possiveis_tarefas(T,LLP,R2),
   linhas_possiveis_tarefa(H,LLP,R1),
   append([H*R1],R2,R).

linhas_possiveis_tarefa(_,[],[]).
linhas_possiveis_tarefa(TR,[H*_|T],R):-
   linhas_possiveis_tarefa(TR,T,R1),
   ((is_possible(TR,H),append([H],R1,R));(R = R1)).

is_possible(q(_,_,_,_,_,PL),L):-
   operations_of_line(L,LO),
   check_plan(PL,LO),!.

check_plan([],_).
check_plan([OP|T],[m(_,LO)|RT]):-
   ((member(OP,LO),check_plan(T,[m(_,LO)|RT]));(check_plan([OP|T],RT))).

operations_of_line(L,LO):-
   machines_of_line(L,LM),
   operations_of_machines(LM,LO).

operations_of_machines([],[]).
operations_of_machines([H|T],LO):-
   type_of_machine(H,MT),
   findall(p(OPT,TOOL),machine_type_operation(MT,p(OPT,TOOL)),LO1),
   operations_of_machines(T,LO2),
   append([m(H,LO1)],LO2,LO).

sortTC(L,LR):-
   sortByTC(L, LR).
sortByTC(List,Sorted):-
   tcsort(List,[],Sorted),!.
tcsort([],Acc,Acc).
tcsort([H|T],Acc,Sorted):-
   tcinsert(H,Acc,NAcc),
   tcsort(T,NAcc,Sorted).
tcinsert(q(IX,IDX,MSX,TCX,PRX,PLX),[q(IY,IDY,MSY,TCY,PRY,PLY)|T],[q(IY,IDY,MSY,TCY,PRY,PLY)|NT]):-
   TCX>TCY,
   tcinsert(q(IX,IDX,MSX,TCX,PRX,PLX),T,NT).
tcinsert(q(IX,IDX,MSX,TCX,PRX,PLX),[q(IY,IDY,MSY,TCY,PRY,PLY)|T],[q(IX,IDX,MSX,TCX,PRX,PLX),q(IY,IDY,MSY,TCY,PRY,PLY)|T]):-
   TCX=<TCY.
tcinsert(X,[],[X]).


gera(LINHA):-
   findall(T,(tarefa(T,_,_,_,_,LP),LP==LINHA),LT),
   retractall(tarefas(_)),
   length(LT,NT),
   assert(tarefas(NT)),

   inicializa,
   gera_populacao(LT,[],Pop),!,

   avalia_populacao(Pop,PopAv),
   ordena_populacao(PopAv,PO),
   geracoes(NG),
   gera_geracao(0,NG,PO),!.

inicializa:-
   retractall(geracoes(_)),
   retractall(populacao(_)),
   retractall(prob_cruzamento(_)),
   retractall(prob_mutacao(_)),

   asserta(geracoes(25)),
   asserta(populacao(3)),
   asserta(prob_cruzamento(0.8)),
   asserta(prob_mutacao(0.8)).



% -------------VV GENERATION OF TASKS FROM DYNAMIC FACTS VV---------------
% ------------------------------------------------------------------------


gera_tarefas(LE,LT):-
   retractall(tarefa(_,_,_,_,_,_)),
   lotes(LE,LP),
   assert_tarefas(LP,_,LT),!.

makespan([],0,0,0).
makespan([p(OT,_)|T],MTS,MTE,MS):-
   makespan(T,MTS1,MTE1,MS1),
   operationtype(OT,TE,TS),
   X is MS1-TS,
   ((X>MTS1,MTS is MTS1);(X=<MTS1,MTS is X)),
   ((TE=<MTE1,MTE is MTE1);(TE>MTE1,MTE is TE)),
   MS is MS1 + TE.

assert_tarefas([],1,[]).
assert_tarefas([p(ID,P,Q,TC,PR)|T],C,[RH|RT]):-
   assert_tarefas(T,C1,RT),
   product_plan(P,PL),
   reverse(PL,RVPL),
   makespan(RVPL,MTS,MTE,MS),
   abs(MTS,ABS),
   MST is MS + (MTE*(Q-1)) + ABS,
   string_concat("t",C1,I),
   RH=q(I,ID,MST,TC,PR,PL),
   C is C1+1.

lotes([],[]).
lotes([p(ID,L,TC,P)|T],R):-
   lotes_encomenda(ID,L,TC,P,R1),
   lotes(T,R2),
   append(R1,R2,R).

lotes_encomenda(_,[],_,_,[]).
lotes_encomenda(ID,[p(P,Q)|T],TC,PR,[p(ID,P,Q,TC,PR)|R]):-
   lotes_encomenda(ID,T,TC,PR,R).


% ----------------VV GENERATION OF INITIAL POPULATION VV------------------
% ------------------------------------------------------------------------


gera_populacao(LT,INIT,POP):-
   length(LT,NT),
   spt(LT,A),
   merge(INIT,[A],INIT1),

   ((NT>1,
    edd(LT,EDD),
    ((member(EDD, INIT1),gera_random(LT,NT,INIT1,B),merge(INIT1,[B],INIT2));(merge(INIT1,[EDD],INIT2))),

    ((NT>2,
     pco(LT,PCO),
     ((member(PCO, INIT2),gera_random(LT,NT,INIT2,C),merge(INIT2,[C],INIT3));(merge(INIT2,[PCO],INIT3)))
     );(POP=INIT2))
   );(POP=INIT1)),
   POP=INIT3.


gera_random(LT,NT,LI,R):-
   gera_individuo(LT,NT,I),!,
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
    tarefa(X,_,MSPX,_,_,_),
    tarefa(Y,_,MSPY,_,_,_),
    MSPX > MSPY,
    minsert(X,T,NT).
minsert(X,[Y|T],[X,Y|T]):-
    tarefa(X,_,MSPX,_,_,_),
    tarefa(Y,_,MSPY,_,_,_),
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
   tarefa(X,_,_,TCX,_,_),
   tarefa(Y,_,_,TCY,_,_),
   TCX>TCY,
   eddinsert(X,T,NT).
eddinsert(X,[Y|T],[X,Y|T]):-
   tarefa(X,_,_,TCX,_,_),
   tarefa(Y,_,_,TCY,_,_),
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
   tarefa(X,_,_,_,PRX,_),
   tarefa(Y,_,_,_,PRY,_),
   PRX=<PRY,
   pcoinsert(X,T,NT).
pcoinsert(X,[Y|T],[X,Y|T]):-
   tarefa(X,_,_,_,PRX,_),
   tarefa(Y,_,_,_,PRY,_),
   PRX>PRY.
pcoinsert(X,[],[X]).


% -----------------------VV EVALUATE POPULATION VV------------------------
% ------------------------------------------------------------------------


avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,_,Dur,Prazo,Pen,_),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	((InstFim =< Prazo,!, VT is 0);(VT is (InstFim-Prazo)*(1+Pen/10))),
	V is VT+VResto.


% ------------------------VV SORT POPULATION VV---------------------------
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


% ---------------------------VV TOURNAMENT VV-----------------------------
% ------------------------------------------------------------------------


tournament(POP,R):-
   random_permutation(POP,RP),
   tournament_round(RP,TP),
   ordena_populacao(TP,R).

tournament_round([],[]).
tournament_round([I*A],[I*A]).
tournament_round([H1*A1,H2*A2|T],[I*A|RT]):-
   ((A1==0,A2\==0,I=H1,A=A1);(A2==0,A1\==0,I=H2,A=A2);
   (A1==0,A2==0,
   random(1,100,R1),
   random(1,100,R2),
   ((R1<R2,I=H1,A=A1);(I=H2,A=A2)));
   (random(1,A1,R1),
   random(1,A2,R2),
   ((R1<R2,I=H1,A=A1);(I=H2,A=A2)))),
   tournament_round(T,RT).


% ------------------------VV MERGE POPULATIONS VV-------------------------
% ------------------------------------------------------------------------


merge_pops(L1,L2,R):-
   append(L1,L2,TMP),
   sort(TMP,R).  %para apagar repetidos


% -----------------------------VV GERACAO VV------------------------------
% ------------------------------------------------------------------------


gera_geracao(G,G,[H|Pop]):-!,
	write('Geracao '), write(G), write(':'), nl, write([H|Pop]), nl,
        write('Production Plan: '),nl,write(H),nl,
        media(Pop).

gera_geracao(N,G,Pop):-
        random_permutation(Pop,RPop),
	cruzamento(RPop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
        merge_pops(Pop,NPopAv,MergedPop),
	ordena_populacao(MergedPop,[NovoMelhor1,NovoMelhor2|NPopOrd]),
        tournament(NPopOrd,NextPop),
	N1 is N+1,
	gera_geracao(N1,G,[NovoMelhor1,NovoMelhor2|NextPop]).


% ---------------------------VV CRUZAMENTO VV-----------------------------
% ------------------------------------------------------------------------


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
	((Pc =< Pcruz,!,cruzar(Ind1,Ind2,P1,P2,NInd1),cruzar(Ind2,Ind1,P1,P2,NInd2))
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


% ---------------------------VV MUTACAO VV--------------------------------
% ------------------------------------------------------------------------


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
media(Pop):-
   length(Pop,L),
   soma_media(Pop,S),
   M is S/L,
   write('MEDIA: '),write(M),nl.

soma_media([],0).
soma_media([_*A|T],M):-
   soma_media(T,M1),
   M is M1+A.

