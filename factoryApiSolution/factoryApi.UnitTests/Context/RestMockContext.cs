using System;
using System.Collections.Generic;
using factoryApi.RestClients;
using Moq;
using productionApi.Context;

namespace factoryApiTest.Context
{
    public class RestMockContext
    {
        public static RestContext GetRestContextMock()
        {
            var dateList = new List<String>();
            var initDate = DateTime.Now;
            var endDate = initDate + TimeSpan.FromDays(3);
            dateList.Add(initDate.Date.Year+"-"+initDate.Date.Month+"-"+initDate.Date.Day+"T00:00:00");
            dateList.Add(endDate.Date.Year+"-"+endDate.Date.Month+"-"+endDate.Date.Day+"T00:00:00");
            
            var restClient = new Mock<ReplanningRestClient>();
        
            restClient.Setup(x => x.Replanning(dateList));
            RestContext context = new RestContext(restClient.Object);
            return context;
        }
    }
}
