using productionApi.RestClients;
using RestSharp;

namespace productionApi.Context
{
    public class RestContext
    {
        public OperationRestClient client { get; }

        public RestContext()
        {
            client=new OperationRestClient();
        }
        
        public RestContext(OperationRestClient restClient)
        {
            client=restClient;
        }
    }
}