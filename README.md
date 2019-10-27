# Projeto

Projeto da edição 2019/2020 de Laboratório Projeto 5 (LAPR5) da Licenciatura em Engenharia Informática do ISEP.
Pretende-se desenvolver uma plataforma digital onde clientes possam encomendar talheres e acompanhar o estado de fabrico dos mesmos.
O tipo de fábrica onde o sistema será implementado fabrica produtos que seguem processos de fabrico lineares ao longo de uma linha de produção.

# Autores

* **Carlos Moreira** - *1161882*

* **José Pedro Santos** - *1161842*

* **Marco Pinheiro** - *1170483*

* **Pedro Barbosa** - *1150486*

* **Pedro Mendes** - *1161871*



# Implementação

O projeto irá ser desenvolvido ao longo de todo o semestre num modo de Project Based Learning (PBL), divindo-se em 3 Sprints.

* Sprint 1
    * Master Data Fabrica
    * Master Data Produção


## Modelo de domínio

Destacam-se os agregados identificados a vermelho:
![ModelDomain](/Diagrams/ModelDomain.jpg)


## Decisões de implementação
- Uso de ASP .Net Core
- Uso de uma base de dados MS-SQL com a adoção de Entity Framework Migrations.
- Adoção de DDD.
- Criação de um controller denominado "Gateway controller" na solução FactoryApi para comunicação com a solução ProductionApi, prevendo eventuais exigências relativas a autenticação.
- Uso de uma camada intermédia denominada "Service" entre o controller e o repositório.
- Bootstrap de Tools e OperationTypes na instanciação dos respetivos controllers. 



# C4 Model 

## **Nível 1**

### Vista Lógica

![D1](/Diagrams/LogicalView_D1.jpg)

### Vista de Processo

![D2](/Diagrams/ProcessView_D2.jpg)

### Vista de Cenários

![D3](/Diagrams/ScenaryView_D3.jpg)



## **Nível 2**

### Vista Lógica

![D4](/Diagrams/LogicalView_D4.jpg)

### Vista de Processo

![D5](/Diagrams/ProcessView_D5.jpg)

### Vista Fisíca

![D7](/Diagrams/PhysicalView_D7.jpg)

### Vista de Implementação

![D6](/Diagrams/ImplementationView_D6.jpg)



## **Nível 3**

### Vista Lógica **FactoryAPI**

![D8](/Diagrams/LogicalView_D8.jpg)

### Vista de Processo **FactoryAPI**

**Create Operation**
![D9](/Diagrams/ProcessView_D9_CreateOperation.png)

**Create Machine**
![D9](/Diagrams/Process_View_Level3_D9_CreateMachine.jpg)

### Vista de Implementação **FactoryAPI**

![D10](/Diagrams/ImplementationView_D10.jpg)



### Vista Lógica **ProductionAPI**

![D11](/Diagrams/LogicalView_D11.jpg)

### Vista de Processo **ProductionAPI**

**Create Product**
![D12](/Diagrams/ProcessView_D12.jpg)


### Vista de Implementação **ProductionAPI**s

![D13](/Diagrams/ImplementationView_D13.jpg)


# Testes

## Integração

Os testes de integração foram realizados utilizando o HTTPClient Postman e respetiva plataforma de testes.

Seguem a ordem especificada no diagrama seguinte:

![PostmanTests](/Diagrams/PostManTestsSSD.png)

Resultado dos diversos testes desenvolvidos:

![PostmanTestResults](/Diagrams/PostmanResults.png)

## Unitários

Os testes unitários aos controllers foram desenvolvidos usando um contexto "mock" em memória que simula a base de dados MS-SQL que temos configurada.

![UnitTestsContext](/Diagrams/UnitTestsContext.png)