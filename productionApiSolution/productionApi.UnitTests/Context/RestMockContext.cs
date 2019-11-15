using System.Collections.Generic;
using System.Net;
using Moq;
using productionApi.Context;
using productionApi.DTO;
using productionApi.RestClients;
using RestSharp;

namespace productionApiTest.Context
{
    public class RestMockContext
    {
        public static RestContext GetRestContextMock()
        {
            var factoryOperationsList = new List<FactoryApiOperationDto>
            {
                new FactoryApiOperationDto(6, "tool1",1,
                    new OperationTypeDto(1,"name1",10,2)), 
                new FactoryApiOperationDto(7, "tool2", 2,
                    new OperationTypeDto(1,"name2",5,1))
            };
            
            var restClient = new Mock<OperationRestClient>();
        
            restClient.Setup(x => x.GetOperations())
                .Returns(factoryOperationsList);
            RestContext context = new RestContext(restClient.Object);
            return context;
        }
    }
}