using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;
using Newtonsoft.Json;
using productionApi.DTO;
using RestSharp;

namespace productionApi.Services
{
    public class OperationService
    {
        public bool validateOperations(ICollection<CreateOperationDto> operations)
        {
            try
            {
                var client = new RestClient("https://localhost:5001");
                var request = new RestRequest("factoryapi/operations", Method.GET);

                IRestResponse<List<FactoryApiOperationDto>> response = client.Execute<List<FactoryApiOperationDto>>(request);
                List<long> ids = new List<long>();
                foreach (var factoryApiDto in response.Data)
                {
                    ids.Add(factoryApiDto.OperationId); 
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