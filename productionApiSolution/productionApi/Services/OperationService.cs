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

        public bool validateOperations(ICollection<CreateOperationDto> operations)
        {
            try
            {
                List<FactoryApiOperationDto> operationsResponse = Client.GetOperations();
                List<long> ids = new List<long>();
                foreach (var factoryApiDto in operationsResponse)
                {
                    ids.Add(factoryApiDto.operationId); 
                }
                
                
                foreach (var createOperationDto in operations)
                {
                    if (!ids.Contains(createOperationDto.OperationId))
                    {
                        return false;
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
                return false;
            }
            return true;
        }
    }
}