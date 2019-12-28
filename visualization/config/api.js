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
    },
    productionPlanningApi: {
        url: 'http://localhost:1337/production_planning/'
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

function getPlanFiles() {
    if (!configurationsApi.factoryApi.isEnable) {
        return planFiles;
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
      "GET",
      configurationsApi.productionPlanningApi.url +
        "get_all_plans",
      false
    );
    xmlHttp.send(null);
    var files = xmlHttp.responseText.substring(1,xmlHttp.responseText.length -1 ).split(",");
    return convertDates(files);
  }

  function convertDates(files){
    let names = [];
    for(let i = 0; i < files.length; i++){
        let file = files[i].substring(0,files[i].length-4).split('_');
        let initialDateISO = new Date(parseInt(file[1]) * 1000).toISOString();
        let finalDateISO = new Date(parseInt(file[2]) * 1000).toISOString();
        names.push(initialDateISO.substring(0, initialDateISO.length - 14) + ' to ' + finalDateISO.substring(0, finalDateISO.length - 14));
    }
    return names;
  }

  function getMachinesAgendas(dates) {
    let splitted = dates.split(' to ')
    let initialDate = splitted[0];
    let finalDate = splitted[1];

    let jsonFile = {
      inicio: initialDate + "T00:00:00",
      fim: finalDate + "T00:00:00"
    };

    if (!configurationsApi.factoryApi.isEnable) {
      return JSON.parse(planningMock);
    } else {
      var body = JSON.stringify(jsonFile);
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open(
        "POST",
        "http://localhost:1337/production_planning/get_plan",
        false
      );
      xmlHttp.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      xmlHttp.send(body);

      //Aqui adicionar serviço para parse do text.
    //   return JSON.parse(xmlHttp.responseText);
      return JSON.parse(planningMock)
    }
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

planningMock = `
{
    "maquinas": [{
        "nome": "ma",
        "tarefas": [{
                "inicio": "0",
                "fim": "5",
                "tipo": "setup",
                "produto": "",
                "repeticoes": "",
                "encomenda": ""
            },
            {
                "inicio": "5",
                "fim": "65",
                "tipo": "exec",
                "produto": "p1",
                "repeticoes": "5",
                "encomenda": "o4"
            },
            {
                "inicio": "90",
                "fim": "150",
                "tipo": "exec",
                "produto": "p3",
                "repeticoes": "5",
                "encomenda": "o3"
            },
            {
                "inicio": "175",
                "fim": "211",
                "tipo": "exec",
                "produto": "p3",
                "repeticoes": "3",
                "encomenda": "o2"
            }
        ]
    }]
}
`;

planFiles = ['26-12-2019 to 01-01-2020'];