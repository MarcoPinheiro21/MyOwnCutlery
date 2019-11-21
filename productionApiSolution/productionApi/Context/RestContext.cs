using System.Net.Http;
using productionApi.RestClients;
using RestSharp;

namespace productionApi.Context
{
    public class RestContext
    {
        public OperationRestClient client { get; }

        public RestContext(HttpClient httpClient)
        {
            client=new OperationRestClient(httpClient);
        }
        
        public RestContext(OperationRestClient restClient)
        {
            client=restClient;
        }
    }
}