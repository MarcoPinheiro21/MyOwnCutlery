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

function getMachineDescriptions() {
    // TODO fazer integracao
    return JSON.parse(machinesDescriptionsMock);
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
                "productionLineId": 1,
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
    },
    {
        "productionLineId": 3,
        "productionLineName": "Linha Produção 3",
        "machinesListDtos": [
            {
                "id": 9,
                "description": "Maquina9",
                "machineTypeId": 1,
                "productionLineId": 3,
                "productionLinePosition": 0
            },{
                "id": 10,
                "description": "Maquina10",
                "machineTypeId": 2,
                "productionLineId": 3,
                "productionLinePosition": 0
            },{
                "id": 11,
                "description": "Maquina11",
                "machineTypeId": 1,
                "productionLineId": 3,
                "productionLinePosition": 0
            },{
                "id": 12,
                "description": "Maquina12",
                "machineTypeId": 2,
                "productionLineId": 3,
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
