using System.Collections.Generic;
using System.Threading.Tasks;
using factoryApi.Controllers;
using factoryApi.DTO;
using factoryApiTest.Context;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace factoryApiTest.Controllers
{
    public class TestOperationController
    {
        [Fact]
        public async Task GetAllOperations_ShouldReturnAllOperations()
        {
            //Arrange
            var testContext = MasterFactoryMockContext.GetMasterFactoryContextMock();
            var theController = new OperationsController(testContext);
            
            //Act
            var result = theController.GetOperations();
            
            //Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
        }
    }
}