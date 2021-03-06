:-dynamic order/4.
:-dynamic product_plan/2.
:-dynamic operationtype/3.


register_dynamic_facts_offline:-
    retractall(operationtype(_,_,_)),
    retractall(product_plan(_,_)),
    retractall(order(_,_,_,_)),
    %order(CLIENTE,[p(PRODUTO,QUANTIDADE)],DATA LIMITE, PRIORIDADE)
    assert(order("c1",[p("p1",5),p("p3",7)],1620,5)),
    assert(order("c2",[p("p2",2),p("p3",3),p("p5",3)],1440,3)),
    assert(order("c3",[p("p2",6),p("p4",5),p("p1",3)],1560,2)),
    assert(order("c4",[p("p5",10),p("p2",2)],1200,1)),
    assert(order("c4",[p("p5",7),p("p2",2)],2200,4)),

    %product_plan(PRODUTO,[p(TOOL,OPERATION TYPE)])
    assert(product_plan("p1",[p("t1","opt1"),p("t3","opt3"),p("t4","opt4")])),
    assert(product_plan("p2",[p("t1","opt1"),p("t2","opt2"),p("t4","opt4"),p("t5","opt5")])),
    assert(product_plan("p3",[p("t1","opt1"),p("t2","opt2"),p("t3","opt3"),p("t4","opt4"),p("t5","opt5")])),
    assert(product_plan("p4",[p("t2","opt2"),p("t3","opt3"),p("t5","opt5")])),
    assert(product_plan("p5",[p("t1","opt1"),p("t2","opt2"),p("t3","opt3"),p("t5","opt5")])),
    %operationtype(NOME,T.EXECUCAO,T.SETUP)
    assert(operationtype("opt1",36,11)),
    assert(operationtype("opt2",40,10)),
    assert(operationtype("opt3",34,13)),
    assert(operationtype("opt4",27,8)),
    assert(operationtype("opt5",42,9)).


% ------------VV INITIAL ITERATION OF GENETIC ALGORITHM VV---------------
% -----------------------------------------------------------------------


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic tarefa/4.
:-dynamic tarefas/1.
% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).

% parameteriza
inicializa:-
   retractall(geracoes(_)),
   retractall(populacao(_)),
   retractall(prob_cruzamento(_)),
   retractall(prob_mutacao(_)),

   asserta(geracoes(25)),
   asserta(populacao(3)),
   asserta(prob_cruzamento(0.8)),
   asserta(prob_mutacao(0.8)).

gera:-
	findall(p(LP,TC,P),(order(_,LP,TC,P)),LE),
	gera_tarefas(LE),
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

gera_tarefas(LE):-
   retractall(tarefa(_,_,_,_)),
   retractall(tarefas(_)),
   lotes(LE,LP),
   length(LP,NT),
   assert(tarefas(NT)),
   assert_tarefas(LP,_),!.

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

gera_populacao(Pop):-
	findall(T,tarefa(T,_,_,_),LT),
	length(LT,L),
	gera_populacao(3,LT,L,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

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
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*(1+Pen/10))
	),
	V is VT+VResto.

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


gera_geracao(G,G,Pop):-!,
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl,
	media(Pop).

gera_geracao(N,G,Pop):-
	write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,
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


media(Pop):-
   length(Pop,L),
   soma_media(Pop,S),
   M is S/L,
   write('MEDIA: '),write(M).

soma_media([],0).
soma_media([_*A|T],M):-
   soma_media(T,M1),
   M is M1+A.
