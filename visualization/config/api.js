configurationsApi = {
    visualizationApi: {
        url: 'http://localhost:6001/'
    },
    factoryApi: {
        url: 'https://localhost:5001/',
        productionLines: 'factoryapi/productionlines',
        isEnable: false
    }
};

function getProductionLines()
{
    if(!configurationsApi.factoryApi.isEnable) {
        return JSON.parse(jsonResponse);
    } 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", configurationsApi.factoryApi.url + configurationsApi.factoryApi.productionLines, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

const jsonResponse = `[
    {
        "productionLineId": 1,
        "productionLineName": "Linha Produção 1",
        "machinesListDtos": [
            {
                "id": 1,
                "description": "Maquina1",
                "machineTypeId": 1,
                "productionLineId": 1
            },{
                "id": 2,
                "description": "Maquina2",
                "machineTypeId": 2,
                "productionLineId": 1
            },{
                "id": 3,
                "description": "Maquina3",
                "machineTypeId": 1,
                "productionLineId": 1
            },{
                "id": 4,
                "description": "Maquina4",
                "machineTypeId": 2,
                "productionLineId": 1
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
                "productionLineId": 2
            },{
                "id": 6,
                "description": "Maquina6",
                "machineTypeId": 2,
                "productionLineId": 2
            },{
                "id": 7,
                "description": "Maquina7",
                "machineTypeId": 1,
                "productionLineId": 2
            },{
                "id": 8,
                "description": "Maquina8",
                "machineTypeId": 2,
                "productionLineId": 2
            }
        ]
    }
]`; 