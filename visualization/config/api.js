configurationsApi = {
    visualizationApi: {
        url: 'http://localhost:6001/'
    },
    factoryApi: {
        url: 'https://localhost:5001/',
        productionLines: 'visualization/productionlines',
        machineTypes: 'visualization/machines/types',
        machines: 'factoryapi/machines',
        isEnable: false
    },
    productionApi: {
        url: 'https://localhost:8090/productionapi/',
        products: 'products/',
    }
};

function getMachines() {
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(machinesDescriptionsMock);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machines, false );
    console.log(configurationsApi.factoryApi.url + configurationsApi.factoryApi.machines);
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function getProductionLines()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(productionLinesMockResponse);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.productionLines, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
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
    xmlHttp.open( "PUT", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machines + '/' + machine.id, false );
    xmlHttp.setRequestHeader('Content-Type', "application/json;charset=UTF-8");  
    xmlHttp.send( body );
    return JSON.parse(xmlHttp.responseText);
}

function updateMovedMachine(machine)
{
    var body=JSON.stringify(machine);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", updateVisualizationModelListener());
    xmlHttp.open( "PUT", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machines + '/' + machine.id, false );
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
                    "executionTime": 60,
                    "setupTime": 5
                }
            }
        ],
        "visualizationModel": "Robotic Arm"
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
                    "executionTime": 30,
                    "setupTime": 6
                }
            },
            {
                "operationId": 1,
                "toolId": 1,
                "tool": "Hammer",
                "operationType": {
                    "operationTypeId": 1,
                    "desc": "op1",
                    "executionTime": 60,
                    "setupTime": 5
                }
            }
        ],
        "visualizationModel": "Robotic Arm"
    }
]`;

const machinesDescriptionsMock = `[
    {
        "id": 1,
        "description": "Maquina1",
        "machineTypeId": 1,
        "productionLineId": 2,
        "productionLinePosition": 2
    },
    {
        "id": 2,
        "description": "Maquina2",
        "machineTypeId": 2,
        "productionLineId": 2,
        "productionLinePosition": 5
    },
    {
        "id": 3,
        "description": "Maquina3",
        "machineTypeId": 1,
        "productionLineId": 2,
        "productionLinePosition": 6
    },
    {
        "id": 4,
        "description": "Maquina4",
        "machineTypeId": 2,
        "productionLineId": 2,
        "productionLinePosition": 3
    },
    {
        "id": 5,
        "description": "Maquina5",
        "machineTypeId": 1,
        "productionLineId": 1,
        "productionLinePosition": 1
    },
    {
        "id": 6,
        "description": "Maquina6",
        "machineTypeId": 2,
        "productionLineId": 1,
        "productionLinePosition": 4
    },
    {
        "id": 7,
        "description": "Maquina7",
        "machineTypeId": 1,
        "productionLineId": 1,
        "productionLinePosition": 5
    },
    {
        "id": 8,
        "description": "Maquina8",
        "machineTypeId": 2,
        "productionLineId": 2,
        "productionLinePosition": 4
    }
]`;

const productsMock = `[
    {
        "productId": 1,
        "productName": "p1",
        "planId": 1
    },
    {
        "productId": 2,
        "productName": "p2",
        "planId": 2
    },
    {
        "productId": 4,
        "productName": "p3",
        "planId": 4
    },
    {
        "productId": 13,
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
