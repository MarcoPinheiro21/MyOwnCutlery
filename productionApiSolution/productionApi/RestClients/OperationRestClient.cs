using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using productionApi.DTO;
using RestSharp;

namespace productionApi.RestClients
{
    public class OperationRestClient
    {
        private RestClient _client;
        private readonly HttpClient _httpClient;
        public OperationRestClient(HttpClient httpClient)
        {
            
            _client = new RestClient(httpClient.BaseAddress);
        }
        
        public OperationRestClient()
        {
            
        }

        public virtual List<FactoryApiOperationDto> GetOperations()
        {
            try
            {
                //Workaround for Mac OS Http Certificates
                ServicePointManager.ServerCertificateValidationCallback = 
                    delegate { return true; };
                
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