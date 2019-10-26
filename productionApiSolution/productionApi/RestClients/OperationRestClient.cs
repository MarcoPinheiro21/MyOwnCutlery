using System;
using System.Collections.Generic;
using productionApi.DTO;
using RestSharp;

namespace productionApi.RestClients
{
    public class OperationRestClient
    {
        private RestClient _client;
        public OperationRestClient()
        {
            _client = new RestClient("https://localhost:5001");
        }
        
        public OperationRestClient(RestClient client)
        {
            _client = client;
        }

        public virtual List<FactoryApiOperationDto> GetOperations()
        {
            try
            {
                var request = new RestRequest("factoryapi/gateway/operations", Method.GET);


                IRestResponse stringResponse = _client.Execute(request);

                IRestResponse<List<FactoryApiOperationDto>> response =
                    _client.Execute<List<FactoryApiOperationDto>>(request);
                
                return response.Data;
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }
    }
}