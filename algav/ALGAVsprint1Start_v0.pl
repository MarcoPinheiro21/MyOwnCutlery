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


% Operações

tipo_operacoes([opt1,opt2,opt3]).

% operacoes/1 deve ser criado dinamicamente
operacoes([op1,op2,op3,op4,op5,op6,op7,op8]).

%operacoes_atrib_maq depois deve ser criado dinamicamente
operacoes_atrib_maq(ma,[op1,op2,op3,op4,op5]).

% classif_operacoes/2 deve ser criado dinamicamente %%atomic_concat(op,NumOp,Resultado)
classif_operacoes(op1,opt1).
classif_operacoes(op2,opt2).
classif_operacoes(op3,opt1).
classif_operacoes(op4,opt2).
classif_operacoes(op5,opt3).
classif_operacoes(op6,opt1).
classif_operacoes(op7,opt3).
classif_operacoes(op8,opt2).

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
% termos e(<produto>,<n.unidades>,<tempo_conclusao>)

encomenda(clA,[e(pA,1,100),e(pB,1,100)]).
encomenda(clB,[e(pA,1,110),e(pB,1,150),e(pC,1,300)]).
% ...


% Separar posteriormente em varios ficheiros


% permuta/2 gera permutações de listas
permuta([ ],[ ]).
permuta(L,[X|L1]):-apaga1(X,L,Li),permuta(Li,L1).

apaga1(X,[X|L],L).
apaga1(X,[Y|L],[Y|L1]):-apaga1(X,L,L1).

% permuta_tempo/3 faz uma permutação das operações atribuídas a uma maquina e calcula tempo de ocupação incluindo trocas de ferramentas

permuta_tempo(M,LP,Tempo):- operacoes_atrib_maq(M,L),
permuta(L,LP),soma_tempos(semfer,M,LP,Tempo).


soma_tempos(_,_,[],0).
soma_tempos(Fer,M,[Op|LOp],Tempo):- classif_operacoes(Op,Opt),
	operacao_maquina(Opt,M,Fer1,Tsetup,Texec),
	soma_tempos(Fer1,M,LOp,Tempo1),
	((Fer1==Fer,!,Tempo is Texec+Tempo1);
			Tempo is Tsetup+Texec+Tempo1).

% melhor escalonamento com findall, gera todas as solucoes e escolhe melhor

melhor_escalonamento(M,Lm,Tm):-
				get_time(Ti),
				findall(p(LP,Tempo),
				permuta_tempo(M,LP,Tempo), LL),
				melhor_permuta(LL,Lm,Tm),
				get_time(Tf),Tcomp is Tf-Ti,
				write('GERADO EM '),write(Tcomp),
				write(' SEGUNDOS'),nl.

melhor_permuta([p(LP,Tempo)],LP,Tempo):-!.
melhor_permuta([p(LP,Tempo)|LL],LPm,Tm):-melhor_permuta(LL,LP1,T1),
		((Tempo<T1,!,Tm is Tempo,LPm=LP);(Tm is T1,LPm=LP1)).






sort_by_type(List,Sorted):-tsort(List,[],Sorted),!.
tsort([],Acc,Acc).
tsort([H|T],Acc,Sorted):-tinsert(H,Acc,NAcc),tsort(T,NAcc,Sorted).
tinsert(X,[Y|T],[Y|NT]):- \+mesmo_tipo(X,Y),tinsert(X,T,NT).
tinsert(X,[Y|T],[X,Y|T]):- mesmo_tipo(X,Y).
tinsert(X,[],[X]).

sort_by_head(List,Sorted):-hsort(List,[],Sorted),!.
hsort([],Acc,Acc).
hsort([H|T],Acc,Sorted):-hinsert(H,Acc,NAcc),hsort(T,NAcc,Sorted).
hinsert(X,[Y|T],[Y|NT]):- \+smallest_head(X,Y),hinsert(X,T,NT).
hinsert(X,[Y|T],[X,Y|T]):- smallest_head(X,Y).
hinsert(X,[],[X]).

sort_by_total(List,Sorted):-ssort(List,[],Sorted),!.
ssort([],Acc,Acc).
ssort([H|T],Acc,Sorted):-sinsert(H,Acc,NAcc),ssort(T,NAcc,Sorted).
sinsert(X,[Y|T],[Y|NT]):- \+smallest_total(X,Y),sinsert(X,T,NT).
sinsert(X,[Y|T],[X,Y|T]):- smallest_total(X,Y).
sinsert(X,[],[X]).

separate_by_type([],[]).
separate_by_type([X|Y],[LH|LT]):-
    single_out_first_list(X,[X|Y],LH,R),!,
    separate_by_type(R,LT).

single_out_first_list(_,[],[],[]).
    single_out_first_list(Q,[X|L],[X|L1],L2):-
        mesmo_tipo(Q,X),
        !,
        single_out_first_list(Q,L,L1,L2).
    single_out_first_list(Q,[X|L],L1,[X|L2]):-
        single_out_first_list(Q,L,L1,L2).

smallest_head([X|_],[Z|_]):-
    classif_operacoes(X,T1),
    classif_operacoes(Z,T2),
    operacao_maquina(T1,_,_,_,TMP1),
    operacao_maquina(T2,_,_,_,TMP2),
    TMP1 =< TMP2.

smallest_total(X,Z):-
    total(X,T1),
    total(Z,T2),
    T1 =< T2.

total([],0).
total([H|T],R):-
    classif_operacoes(H,TY),
    operacao_maquina(TY,_,_,_,TMP),
    total(T,R1),
    R is R1 + TMP.


mesmo_tipo(X,Y):-
    classif_operacoes(X,R),
    classif_operacoes(Y,R).


spt_head(L,LR):- sort_by_type(L, X), separate_by_type(X, Z),sort_by_head(Z,LR).
spt_total(L,LR):- sort_by_type(L, X), separate_by_type(X, Z),sort_by_total(Z,LR).
























