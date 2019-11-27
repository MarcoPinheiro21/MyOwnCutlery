:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- dynamic type_of_machine/2.
:- dynamic operationtype/3.
:- dynamic operation/2.
:- dynamic machine_type_operation/3.
:- dynamic maq_linha/2.
:- dynamic product_plan/2.

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
    format('Content-type: text/plain~n~n'),
    format("Success").


comeca_split_parametros(Lista,R,OPL):-
    retractall(type_of_machine(_,_)),
    retractall(operationtype(_,_,_)),
    retractall(operation(_,_,_)),
    retractall(machine_type_operation(_,_)),
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
    assert(maq_linha(N,L)),
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



