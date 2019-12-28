using System.Net.Http;
using factoryApi.RestClients;

namespace productionApi.Context
{
    public class RestContext
    {
        public ReplanningRestClient client { get; }

        public RestContext(HttpClient httpClient)
        {
            client=new ReplanningRestClient(httpClient);
        }
        
        public RestContext(ReplanningRestClient restClient)
        {
            client=restClient;
        }
    }
}