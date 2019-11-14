:- dynamic melhor_sol_to/2.

:- dynamic classif_operacoes/2.
:- dynamic operacoes_atrib_maq/2.
:- dynamic op_prod_client/9.

% FÁBRICA

% Linhas

linhas([lA]).


% Maquinas


maquinas([ma]).



% Ferramentas


ferramentas([fa,fa,fc]).


% Maquinas que constituem as Linhas

tipos_maq_linha(lA,[ma]).
% ...


% Operacoes

tipo_operacoes([opt1,opt2,opt3]).

% operacoes/1 deve ser criado dinamicamente
% operacoes([op1,op2,op3,op4,op5]).

%operacoes_atrib_maq depois deve ser criado dinamicamente
% operacoes_atrib_maq(ma,[op1,op2,op3,op4,op5,op6,op7,op8,op9,op10]).

% classif_operacoes/2 deve ser criado dinamicamente %%atomic_concat(op,NumOp,Resultado)
% classif_operacoes(op1,opt1).
% classif_operacoes(op2,opt2).
% classif_operacoes(op3,opt1).
% classif_operacoes(op4,opt2).
% classif_operacoes(op5,opt3).

% classif_operacoes(op6,opt1).
% classif_operacoes(op7,opt3).
% classif_operacoes(op8,opt1).
% classif_operacoes(op9,opt3).
% classif_operacoes(op10,opt3).
% ...


% Afetação de tipos de operações a tipos de máquinas
% com ferramentas, tempos de setup e tempos de execucao)

operacao_maquina(opt1,ma,fa,5,60).
operacao_maquina(opt2,ma,fb,6,30).
operacao_maquina(opt3,ma,fc,8,40).
%...


% PRODUTOS

produtos([pA,pB,pC]).

operacoes_produto(pA,[opt1]).
operacoes_produto(pB,[opt2]).
operacoes_produto(pC,[opt3]).



% ENCOMENDAS

%Clientes

clientes([clA,clB]).


% prioridades dos clientes

prioridade_cliente(clA,1).
prioridade_cliente(clB,2).
% ...

% Encomendas do cliente,
% termos e(<produto>,<n.unidades>,<tempo_entrega>)

encomenda(clA,[e(pA,1,100),e(pB,1,100)]).
encomenda(clB,[e(pA,1,110),e(pB,1,150),e(pC,1,300)]).
encomenda(clC,[e(pA,1,110),e(pB,1,150),e(pC,1,300)]).
encomenda(clD,[e(pA,1,110),e(pB,1,150)]).
encomenda(clE,[e(pA,1,110),e(pB,1,150)]).

% ...


% Separar posteriormente em varios ficheiros


% permuta/2 gera permutações de listas
permuta([ ],[ ]).
permuta(L,[X|L1]):-
	apaga1(X,L,Li),
	permuta(Li,L1).

apaga1(X,[X|L],L).
apaga1(X,[Y|L],[Y|L1]):-
	apaga1(X,L,L1).

% permuta_tempo/3 faz uma permutação das operações atribuídas a uma maquina
% e calcula tempo de ocupação incluindo trocas de ferramentas

permuta_tempo(M,LP,Tempo):-
	operacoes_atrib_maq(M,L),
	permuta(L,LP),
	soma_tempos(semfer,M,LP,Tempo).


soma_tempos(_,_,[],0).
soma_tempos(Fer,M,[Op|LOp],Tempo):-
	classif_operacoes(Op,Opt),
	operacao_maquina(Opt,M,Fer1,Tsetup,Texec),
	soma_tempos(Fer1,M,LOp,Tempo1),
	((Fer1==Fer,!,Tempo is Texec+Tempo1);
			Tempo is Tsetup+Texec+Tempo1).

% melhor escalonamento com findall, gera todas as solucoes e escolhe melhor
melhor_escalonamento(M,Lm,Tm):-
	get_time(Ti),
	findall(p(LP,Tempo), permuta_tempo(M,LP,Tempo), LL),
	melhor_permuta(LL,Lm,Tm),
	get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

melhor_permuta([p(LP,Tempo)],LP,Tempo):-!.
melhor_permuta([p(LP,Tempo)|LL],LPm,Tm):-
	melhor_permuta(LL,LP1,T1),
	((Tempo<T1,!,Tm is Tempo,LPm=LP);(Tm is T1,LPm=LP1)).


% PL
geraLP_findAll(M,LL):-
	findall(p(LP,Tempo), permuta_tempo(M,LP,Tempo), LL).

% melhor escalonamento sem o findall, gera todas as solucoes e escolhe melhor
melhor_escalonamento1(M,Lm,Tm):-
	get_time(Ti),
	(melhor_escalonamento11(M);true),
	retract(melhor_sol_to(Lm,Tm)),
	get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

melhor_escalonamento11(M):-
	asserta(melhor_sol_to(_,10000)),!,
	permuta_tempo(M,LP,Tempo),
	atualiza(LP,Tempo),
	fail.

atualiza(LP,T):-
	melhor_sol_to(_,Tm),
	T<Tm,retract(melhor_sol_to(_,_)),
	asserta(melhor_sol_to(LP,T)),!.




sort_by_type(List,Sorted):-
	tsort(List,[],Sorted),!.

tsort([],Acc,Acc).
tsort([H|T],Acc,Sorted):-
	tinsert(H,Acc,NAcc),
	tsort(T,NAcc,Sorted).

tinsert(X,[Y|T],[Y|NT]):-
	\+mesmo_tipo(X,Y),
	tinsert(X,T,NT).
tinsert(X,[Y|T],[X,Y|T]):-
	mesmo_tipo(X,Y).
tinsert(X,[],[X]).

mesmo_tipo(X,Y):-
    classif_operacoes(X,R),
    classif_operacoes(Y,R).

spt(L,LR):-
	get_time(Ti),
	sort_by_type(L, LR),
	get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

% ---------------------------------------------------
% ----------------CRIAÇÃO DINÁMICA-------------------

cria_op_enc:-findall(t(Cliente,Prod,Qt,TConc),
		(encomenda(Cliente,LE),member(e(Prod,Qt,TConc),LE)),
		LT),cria_ops(LT,0),
findall(Op,classif_operacoes(Op,_),LOp),asserta(operacoes(LOp)),
maquinas(LM),
 findall(_,
		(member(M,LM),
		 findall(Opx,op_prod_client(Opx,M,_,_,_,_,_,_,_),LOpx),
		 assertz(operacoes_atrib_maq(M,LOpx))),_).

cria_ops([],_).
cria_ops([t(Cliente,Prod,Qt,TConc)|LT],N):-
			operacoes_produto(Prod,LOpt),
	cria_ops_prod_cliente(LOpt,Prod,Cliente,Qt,TConc,N,N1),
			cria_ops(LT,N1).


cria_ops_prod_cliente([],_,_,_,_,Nf,Nf).
cria_ops_prod_cliente([Opt|LOpt],Client,Prod,Qt,TConc,N,Nf):-
			Ni is N+1,
			atomic_concat(op,Ni,Op),
			assertz(classif_operacoes(Op,Opt)),
			operacao_maquina(Opt,M,F,Tsetup,Texec),
	assertz(op_prod_client(Op,M,F,Prod,Client,Qt,TConc,Tsetup,Texec)),
	cria_ops_prod_cliente(LOpt,Client,Prod,Qt,TConc,Ni,Nf).


% ------------------------------------------------------------
testAstarSetups([H|T]):-
	aStarSetups([H|T],_,_),
	testAstarSetups(T).


aStarSetups(L,Cam, Custo):-
	get_time(Ti),
	aStarSetups2([(_,0,[],L)], Cam, Custo),!,
	get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

aStarSetups2([(_,Ca,L,LR)|Outros], Cam, Custo):-
	findall((CEX,CaX,[X|L],R),
		(op_prod_client(X,_,_,_,_,_,_,CustoX,_),
		member(X,LR),
		CaX is CustoX + Ca,
		subtract(LR,[X],R),
		estimativa(X,R,EstX),
		CEX is CaX +EstX
		),
		Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStarSetups3(TodosOrd,Cam,Custo).

aStarSetups3([(_,Custo,[H|T],[])|_],Cam,Custo):-
	reverse([H|T],Cam).
aStarSetups3([(Ce,Ca,L,LR)|Outros], Cam, Custo):-
	findall((CEX,CaX,[X|L],R),
		([Ant|_]=L,
		 op_prod_client(X,_,_,_,_,_,_,CustoX,_),
		 member(X,LR),
		 subtract(LR,[X],R),
		 ((\+mesmo_tipo(Ant,X), CaX is CustoX + Ca,estimativa(X,R,EstX),CEX is CaX +EstX);
		 (mesmo_tipo(Ant,X), CaX is Ca, CEX is Ce))),
		Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStarSetups3(TodosOrd,Cam,Custo).

estimativa(X,LR,Estimativa):-
	findall(p(F,TS),(op_prod_client(Op,_,F,_,_,_,_,TS,_),member(Op,LR)),List),
	op_prod_client(X,_,FX,_,_,_,_,_,_),
	sort(List,L),
	soma_setups(FX,L,Estimativa).
soma_setups(_,[],0).
soma_setups(FX,[p(FX,_)|L],Ttotal):-
    soma_setups(FX,L,Ttotal),!.
soma_setups(FX,[p(_,Tsetup)|L],Ttotal):-
    soma_setups(FX,L,T1),
    Ttotal is Tsetup+T1.

% ------------------------------------------------------------------------

aStarAtrasos(L,Cam, Custo):-
	get_time(Ti),
	aStarAtrasos2([(_,0,0,[],L)], Cam, Custo),!,
        get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

aStarAtrasos2([(_,Ca,TA,L,LR)|Outros], Cam, Custo):-
	findall((CEX,CAX,NTA,[X|L],NLR),
		(op_prod_client(X,_,_,_,_,_,TConc,TSetup,TExec),
		 member(X,LR),
		 atraso(TConc,TSetup,TExec,CustoX,TA),
		 CAX is CustoX + Ca,
		 NTA is TSetup+TExec,
		 subtract(LR,[X],NLR),
		 reverse([X|L],Temp),
		 append(Temp,NLR,TL),
		 estimativaAtrasos(TL,CEX)
		),
		Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStarAtrasos3(TodosOrd,Cam,Custo).
aStarAtrasos3([(_,Custo,_,LR,[])|_],Cam,Custo):-
        reverse(LR,Cam).
aStarAtrasos3([(_,Ca,TA,[LH|LT],LR)|Outros], Cam, Custo):-
	findall((CEX,CAX,NTA,[X|[LH|LT]],NLR),
		(op_prod_client(X,_,_,_,_,_,TConc,TSetup,TExec),
		 member(X,LR),
		 ((\+mesmo_tipo(LH,X), RealTSetup is TSetup);
		 (mesmo_tipo(LH,X), RealTSetup is 0)),
		 atraso(TConc,RealTSetup,TExec,CustoX,TA),
		 CAX is CustoX + Ca,
		 NTA is TA+RealTSetup+TExec,
		 subtract(LR,[X],NLR),
		 reverse([X|[LH|LT]],Temp),
		 append(Temp,NLR,TL),
		 estimativaAtrasos(TL,CEX)
		 ),
		Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStarAtrasos3(TodosOrd,Cam,Custo).

estimativaAtrasos(L,Estimativa):-
	h_atraso_setup(L,_,Estimativa),!.

% ----------------------------------------------------------------------------


% Tempos de atraso
setup_menor_tempo_atraso(L, R,T):-
	get_time(Ti),
    findall([H|T],permuta(L, [H|T]), B),
    menor_tempo_atraso(B,R,T),!,
        get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

% calcula o menor tempo de atraso de uma lista de permutações de operações
menor_tempo_atraso([H|T],MenorLista,MenorTempo):-
    predXSetup(H, R),
    menor_tempo_atraso(T, H, R, MenorLista,MenorTempo).
menor_tempo_atraso([],MenorTotal,MenorTempo,MenorTotal,MenorTempo).
menor_tempo_atraso([H|T], _, MenorAtraso, MenorTotal,MenorTempo):-
    predXSetup(H, R),
    R < MenorAtraso,
    menor_tempo_atraso(T, H, R, MenorTotal,MenorTempo).
menor_tempo_atraso([_|T], MenorLista, MenorAtraso, MenorTotal,MenorTempo):-
    menor_tempo_atraso(T, MenorLista, MenorAtraso, MenorTotal,MenorTempo).
% Calcula o atraso para uma dada permutação de operações
predXSetup([H|T],R):-
    op_prod_client(H,_,_,_,_,_,TConc,TSetup,TExec),!,
    atraso(TConc,TSetup,TExec,ThisAtraso,0),
    Acum is TSetup+TExec,
    predX(T,H,Acum,AtrasoTotal),!,
    R is ThisAtraso+AtrasoTotal.
predX([],_,_,0).
predX([H|T],Ant,Acum, R):-
    op_prod_client(H,_,_,_,_,_,TConc,TSetup,TExec),!,
    ((\+mesmo_tipo(Ant,H), RealTSetup is TSetup);
    (mesmo_tipo(Ant,H), RealTSetup is 0)),
    atraso(TConc,RealTSetup,TExec,ThisAtraso,Acum),
    Acum1 is Acum + RealTSetup+TExec,
    predX(T,H,Acum1,AtrasoTotal),!,
    R is ThisAtraso+AtrasoTotal.
atraso(TConc,TSetup,TExec,Atraso,Acum):-
    TConc - (TExec + TSetup + Acum) < 0,!,
    Atraso is(TExec + TSetup+Acum)-TConc.
atraso(_,_,_,0,_).

%-----------------------------------------

h_atraso_setup(L,R,T):-
	get_time(Ti),
	findall(p(Tmp,O),(op_prod_client(O,_,_,_,_,_,Tmp,_,_),member(O,L)),LO),
	sort(LO,LS),
	h_atraso(LS,R,T),!,
	get_time(Tf),Tcomp is Tf-Ti,
	write('GERADO EM '),write(Tcomp),
	write(' SEGUNDOS'),nl.

h_atraso([p(_,H)|[p(_,T)|Tail]],Res,TMP):-
	op_prod_client(H,_,_,_,_,_,TConc,TSetup,TExec),!,
	op_prod_client(T,_,_,_,_,_,TConc2,TSetup2,TExec2),!,

	((\+mesmo_tipo(T,H), RealTSetup is TSetup,RealTSetup2 is TSetup2);
	(mesmo_tipo(T,H), RealTSetup is 0,RealTSetup2 is 0)),

	atraso(TConc,TSetup,TExec,ThisAtraso,0),
	Acc1 is TSetup + TExec,
	atraso(TConc2,RealTSetup2,TExec2,ThisAtraso2,Acc1),

	atraso(TConc2,TSetup2,TExec2,ThisAtraso3,0),
	Acc2 is TSetup2 + TExec2,
	atraso(TConc,RealTSetup,TExec,ThisAtraso4,Acc2),

	AccAtraso1 is ThisAtraso + ThisAtraso2,
	AccAtraso2 is ThisAtraso3+ThisAtraso4,
	((AccAtraso1=<AccAtraso2, NTA is Acc1, h_atraso([p(_,T)|Tail],H,NTA,ThisAtraso,RT,TMP), append([H],RT,Res));
	(AccAtraso1>AccAtraso2, NTA is Acc2, h_atraso([p(_,H)|Tail],T,NTA,ThisAtraso3,RT,TMP), append([T],RT,Res))).
h_atraso([p(_,H)|[]],_,_,TMP,[H],TMP).
h_atraso([p(_,H)|[p(_,T)|Tail]],Prev,TA,AA,Res,TMP):-
	op_prod_client(H,_,_,_,_,_,TConc,TSetup,TExec),!,
	op_prod_client(T,_,_,_,_,_,TConc2,TSetup2,TExec2),!,

	((\+mesmo_tipo(T,H), RealTSetup is TSetup,RealTSetup2 is TSetup2);
	(mesmo_tipo(T,H), RealTSetup is 0,RealTSetup2 is 0)),
	((\+mesmo_tipo(Prev,H), StartTSetup is TSetup);
	(mesmo_tipo(Prev,H), StartTSetup is 0)),
	((\+mesmo_tipo(T,Prev), StartTSetup2 is TSetup2);
	(mesmo_tipo(T,Prev), StartTSetup2 is 0)),


	atraso(TConc,StartTSetup,TExec,ThisAtraso,TA),
	Acc1 is StartTSetup + TExec+TA,
	atraso(TConc2,RealTSetup2,TExec2,ThisAtraso2,Acc1),

	atraso(TConc2,StartTSetup2,TExec2,ThisAtraso3,TA),
	Acc2 is StartTSetup2 + TExec2+TA,
	atraso(TConc,RealTSetup,TExec,ThisAtraso4,Acc2),

	AccAtraso1 is ThisAtraso + ThisAtraso2,
	AccAtraso2 is ThisAtraso3+ThisAtraso4,
	((AccAtraso1=<AccAtraso2, NTA is Acc1,NAA is AA+ThisAtraso, h_atraso([p(_,T)|Tail],H,NTA,NAA,RT,TMP), append([H],RT,Res));
	(AccAtraso1>AccAtraso2, NTA is Acc2,NAA is AA+ThisAtraso3,h_atraso([p(_,H)|Tail],T,NTA,NAA,RT,TMP), append([T],RT,Res))).



