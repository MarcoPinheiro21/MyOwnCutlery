:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- dynamic type_of_machine/2.
:- dynamic operationtype/3.
:- dynamic operation/3.
:- dynamic machine_type_operation/2.

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


server(Port) :-
        http_server(http_dispatch, [port(Port)]).
/*POST TRABALHO*/
:- http_handler('/register_machines', register_machines, []).
register_machines(_) :-
    get_machine_types(JSON),
    split_parametros(JSON,R,OPL),
    assert_machines_of_type(R),
    assert_operations_of_machine_type(OPL),
    format('Content-type: text/plain~n~n'),
    format("Success").


split_parametros(Lista,R,OPL):-
    retractall(type_of_machine(_,_)),
    retractall(operationtype(_,_,_)),
    retractall(operation(_,_,_)),
    retractall(machine_type_operation(_,_)),
    comeca_assert_param(Lista,R,OPL).
comeca_assert_param([],[],[]).
comeca_assert_param([H|T],[RH|RT],[OPLH|OPLT]):-
    MH = H.desc,
    TY = H.id,
    OPLH= p(MH,H.operationList),
    RH=p(MH,TY),
    comeca_assert_param(T,RT,OPLT).


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
   atom_concat('op',LH.operationId,OP),
   TOOL = LH.tool,
   OPT=LH.operationType.desc,
   OPTET=LH.operationType.executionTime,
   OPTST=LH.operationType.setupTime,
   (operationtype(OPT,OPTET,OPTST) -> true ; assert(operationtype(OPT,OPTET,OPTST))),
   (operation(OP,TOOL,OPT) -> true ; assert(operation(OP,TOOL,OPT))),
   assert(machine_type_operation(T,OP)),
   assert_operationlist(T,LT).

