using System;
using System.Collections.Generic;
using productionApi.Context;
using productionApi.DTO;
using productionApi.RestClients;
using RestSharp;

namespace productionApi.Services
{
    public class OperationService
    {

        private OperationRestClient Client { get; set; }

        public OperationService(RestContext context)
        {
            Client = context.client;
        }

        public ICollection<CreateOperationDto> matchOperations(ICollection<CreateOperationDto> operations)
        {
            ICollection<CreateOperationDto> newList = new List<CreateOperationDto>();
            try
            {
                
                List<FactoryApiOperationDto> operationsResponse = Client.GetOperations();
                long ids;
                foreach (var createOperationDto in operations)
                {

                    foreach (var factoryApiDto in operationsResponse)
                    {
                        if (factoryApiDto.operationId.Equals(createOperationDto.OperationId))
                        {
                            CreateOperationDto dto = new CreateOperationDto(factoryApiDto.operationId);
                            dto.Tool = factoryApiDto.tool;
                            dto.Type = factoryApiDto.operationType.desc;
                            newList.Add(dto);

                        }
                    }
                    
                }

                /*var asyncHandle = client.ExecuteAsync<Person>(request, response => {
                    Console.WriteLine(response.Data.Name);
                });
                
                asyncHandle.Abort();*/
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                
            }
            return newList;
        }
    }
}