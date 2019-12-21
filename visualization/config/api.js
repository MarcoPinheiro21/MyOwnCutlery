configurationsApi = {
    visualizationApi: {
        url: 'http://localhost:6001/'
    },
    factoryApi: {
        url: 'https://localhost:5001/',
        productionLines: 'visualization/productionlines',
        machineTypes: 'visualization/machines/types',
        machines: 'factoryapi/machines',
        activeMachines: 'factoryapi/machines/active',
        visMachines: 'visualization/machines',
        isEnable: true
    },
    productionApi: {
        url: 'https://localhost:8090/productionapi/',
        products: 'products/',
    }
};

function getProductionLines()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(productionLinesMockResponse);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.productionLines, false );
    xmlHttp.send( null );
    var productionLines = JSON.parse(xmlHttp.responseText);
    productionLines.forEach(pl => {
        activeMachines = pl.machinesListDtos.filter(machine => machine.active === true);
        pl.machinesListDtos= activeMachines;
    });
    return productionLines;
}

function getMachineTypes()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(machineTypeMockResponse);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machineTypes, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function getProducts()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(productsMock);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.productionApi.url + configurationsApi.productionApi.products, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function getProductPlan(id)
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(planMock);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.productionApi.url + configurationsApi.productionApi.products+id+"/plan", false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function updateVisualizationModel(machinetype)
{
    var body=JSON.stringify(machinetype);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", updateVisualizationModelListener);
    xmlHttp.open( "PUT", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machineTypes + '/' + machinetype.id, false );
    xmlHttp.setRequestHeader('Content-Type', "application/json;charset=UTF-8");  
    xmlHttp.send( body );
    return JSON.parse(xmlHttp.responseText);
}

function updateMachinePosition(machine)
{
    var body=JSON.stringify(machine);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", updateVisualizationModelListener);
    xmlHttp.open( "PUT", configurationsApi.factoryApi.url + configurationsApi.factoryApi.visMachines + '/' + machine.id, false );
    xmlHttp.setRequestHeader('Content-Type', "application/json;charset=UTF-8");  
    xmlHttp.send( body );
    return JSON.parse(xmlHttp.responseText);
}

function updateMovedMachine(machine)
{
    var body=JSON.stringify(machine);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", updateVisualizationModelListener());
    xmlHttp.open( "PUT", configurationsApi.factoryApi.url + configurationsApi.factoryApi.visMachines + '/' + machine.id, false );
    xmlHttp.setRequestHeader('Content-Type', "application/json;charset=UTF-8");  
    xmlHttp.send( body );
    return JSON.parse(xmlHttp.responseText);
}

function getAgendas(date)
{
    if(!configurationsApi.factoryApi.isEnable) {
        return planningMock;
    }else{ 
    var body=JSON.stringify(date);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", updateVisualizationModelListener());
    xmlHttp.open( "POST", "http://localhost:1337/production_planning/get_plan", false );
    xmlHttp.setRequestHeader('Content-Type', "application/json;charset=UTF-8");  
    xmlHttp.send( body );
    return JSON.parse(xmlHttp.responseText);
    }
}



const productionLinesMockResponse = `[
    {
        "productionLineId": 1,
        "productionLineName": "Linha Produção 1",
        "machinesListDtos": [
            {
                "id": 1,
                "description": "Maquina1",
                "machineTypeId": 1,
                "productionLineId": 1,
                "productionLinePosition": 0
            },{
                "id": 2,
                "description": "Maquina2",
                "machineTypeId": 2,
                "productionLineId": 2,
                "productionLinePosition": 0
            },{
                "id": 3,
                "description": "Maquina3",
                "machineTypeId": 1,
                "productionLineId": 1,
                "productionLinePosition": 0
            },{
                "id": 4,
                "description": "Maquina4",
                "machineTypeId": 2,
                "productionLineId": 1,
                "productionLinePosition": 0
            }
        ]
    },
    {
        "productionLineId": 2,
        "productionLineName": "Linha Produção 2",
        "machinesListDtos": [
            {
                "id": 5,
                "description": "Maquina5",
                "machineTypeId": 1,
                "productionLineId": 2,
                "productionLinePosition": 0
            },{
                "id": 6,
                "description": "Maquina6",
                "machineTypeId": 2,
                "productionLineId": 2,
                "productionLinePosition": 0
            },{
                "id": 7,
                "description": "Maquina7",
                "machineTypeId": 1,
                "productionLineId": 2,
                "productionLinePosition": 0
            },{
                "id": 8,
                "description": "Maquina8",
                "machineTypeId": 2,
                "productionLineId": 2,
                "productionLinePosition": 0
            }
        ]
    }
]`; 

const machineTypeMockResponse = `[
    {
        "id": 1,
        "desc": "T1",
        "operationList": [
            {
                "operationId": 1,
                "toolId": 1,
                "tool": "Hammer",
                "operationType": {
                    "operationTypeId": 1,
                    "desc": "op1",
                    "executionTime": 12,
                    "setupTime": 5
                }
            }
        ],
        "visualizationModel": "Hydraulic Press"
    },
    {
        "id": 2,
        "desc": "T2",
        "operationList": [
            {
                "operationId": 2,
                "toolId": 2,
                "tool": "Drill",
                "operationType": {
                    "operationTypeId": 2,
                    "desc": "op2",
                    "executionTime": 17,
                    "setupTime": 4
                }
            }
        ],
        "visualizationModel": "Robotic Arm"
    }
]`;

const productsMock = `[
    {
        "productId": 1,
        "productName": "Spoon",
        "planId": 1
    },
    {
        "productId": 2,
        "productName": "Fork",
        "planId": 2
    },
    {
        "productId": 3,
        "productName": "Knife",
        "planId": 4
    },
    {
        "productId": 4,
        "productName": "Spork",
        "planId": 13
    }
]`

planMock =`[
    {
        "operationId": 1,
        "tool": "Hammer",
        "operationType": "op1"
    },
    {
        "operationId": 2,
        "tool": "Drill",
        "operationType": "op2"
    }
]`


planningMock = `[ma*[t(0,5,setup,Hammer),t(5,65,exec,info(p(op1,Hammer),p1,5,o4,t2)),t(90,150,exec,info(p(op1,Hammer),p3,5,o3,t3)),
    t(175,211,exec,info(p(op1,Hammer),p3,3,o2,t5))],mb*[t(13,17,setup,Drill),t(17,102,exec,info(p(op2,Drill),p1,5,o4,t2)),
        t(102,187,exec,info(p(op2,Drill),p3,5,o3,t3)),t(187,238,exec,info(p(op2,Drill),p3,3,o2,t5)),
        t(238,357,exec,info(p(op2,Drill),p2,7,o1,t7))],mc*[t(114,119,setup,Hammer),
            t(119,199,exec,info(p(op1,Hammer),p3,5,o3,t3)),t(204,250,exec,info(p(op1,Hammer),p3,3,o2,t5)),
            t(255,369,exec,info(p(op1,Hammer),p2,7,o1,t7))],md*[],me*[t(89,94,setup,Hammer),
                t(94,178,exec,info(p(op1,Hammer),p3,7,o4,t1)),t(213,237,exec,info(p(op1,Hammer),p1,2,o2,t6)),
                t(247,307,exec,info(p(op1,Hammer),p1,5,o1,t8))],mf*[t(0,4,setup,Drill),t(4,106,exec,info(p(op2,Drill),p2,6,o3,t4)),
                    t(106,225,exec,info(p(op2,Drill),p3,7,o4,t1)),
                    t(225,259,exec,info(p(op2,Drill),p1,2,o2,t6)),
                    t(259,344,exec,info(p(op2,Drill),p1,5,o1,t8))],mg*[t(16,21,setup,Hammer),
                        t(21,118,exec,info(p(op1,Hammer),p2,6,o3,t4)),t(123,237,exec,info(p(op1,Hammer),p3,7,o4,t1))],mh*[]]`



                        