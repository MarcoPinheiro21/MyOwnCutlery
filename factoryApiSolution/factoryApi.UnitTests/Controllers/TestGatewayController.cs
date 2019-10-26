using System.Collections.Generic;
using System.Threading.Tasks;
using factoryApi.Context;
using factoryApi.Controllers;
using factoryApi.DTO;
using factoryApiTest.Context;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace factoryApiTest.Controllers
{
    public class TestGatewayController
    {
        private MasterFactoryContext _context = MasterFactoryMockContext.GetMasterFactoryContextMock();
        
        private GatewayController theController;
        
        public TestGatewayController()
        {
            theController = new GatewayController(_context);
        }
        
        [Fact]
        public async Task GetAllOperations_ShouldReturnAllOperations()
        {
            //Arrange
            const int expectedCount = 4;

            //Act
            var result = theController.GetOperations();

            //Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);

            List<OperationDto> list = okObjectResult.Value as List<OperationDto>;
            Assert.NotNull(list);

            Assert.Equal(expectedCount, list.Count);
        }
    }
}