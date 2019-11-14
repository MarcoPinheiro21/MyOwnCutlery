configurationsApi = {
    visualizationApi: {
        url: 'http://localhost:6001/'
    },
    factoryApi: {
        url: 'https://localhost:5001/',
        machines: 'factoryapi/machines',
        isEnable: false
    }
};

function getMachines()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(jsonResponse);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.machines, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

const jsonResponse = `[
    {
        "id": 1,
        "description": "MaquinaEditada",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 2,
        "description": "NomeEstranho",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 3,
        "description": "Maquina3",
        "machineTypeId": 1,
        "productionLineId": 0
    },
    {
        "id": 4,
        "description": "Nova Maquina",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 5,
        "description": "criei mais uma",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 6,
        "description": "Maquina Nova Cenas",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 7,
        "description": "Novinha Editada",
        "machineTypeId": 1,
        "productionLineId": 0
    }
]`; 