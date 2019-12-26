using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using RestSharp;

namespace factoryApi.RestClients
{
    public class ReplanningRestClient
    {
        private HttpClient _client;

        public ReplanningRestClient(HttpClient httpClient)
        {
            _client = httpClient;
        }

        public async void Replanning(List<String> dateTimes)
        {
            try
            {
                //Workaround for Mac OS Http Certificates
                ServicePointManager.ServerCertificateValidationCallback =
                    delegate { return true; };
                
                
                var request = new HttpRequestMessage(HttpMethod.Post, "production_planning/begin_plan");

                request.Headers.Add("Accept", "application/json");
                
                var body = new PlanningClientBody(dateTimes[0],dateTimes[1]);
                var json = JsonConvert.SerializeObject(body);
                request.Content = new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json"
                );
                var res = await _client.SendAsync(request);
                Console.WriteLine(res.ReasonPhrase);
        
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }
        }
    }
}