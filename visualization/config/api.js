configurationsApi = {
    visualizationApi: {
        url: 'http://localhost:6001/'
    },
    factoryApi: {
        url: 'https://localhost:5001/',
        machines: 'factoryapi/machines',
        isEnable: true
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
        "description": "Machine1",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 2,
        "description": "Machine2",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 3,
        "description": "Machine3",
        "machineTypeId": 1,
        "productionLineId": 0
    },
    {
        "id": 4,
        "description": "Machine4",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 5,
        "description": "Machine5",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 6,
        "description": "Machine6",
        "machineTypeId": 2,
        "productionLineId": 0
    },
    {
        "id": 7,
        "description": "Machine7",
        "machineTypeId": 1,
        "productionLineId": 0
    },
    {
        "id": 8,
        "description": "Machine8",
        "machineTypeId": 1,
        "productionLineId": 0
    }
]`; 