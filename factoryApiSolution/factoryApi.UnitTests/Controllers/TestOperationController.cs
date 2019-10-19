using System.Collections.Generic;
using System.Threading.Tasks;
using factoryApi.Context;
using factoryApi.Controllers;
using factoryApi.DTO;
using factoryApiTest.Context;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace factoryApiTest.Controllers
{
    public class TestOperationController
    {
        private MasterFactoryContext _context = MasterFactoryMockContext.GetMasterFactoryContextMock();
        
        private OperationsController theController;

        public TestOperationController()
        {
            theController = new OperationsController(_context);
        }

        [Fact]
        public async Task GetAOperation_ShouldReturnTheSpecifiedOperation()
        {
            //Arrange
            const int id = 1;

            //Act
            var result = theController.GetById(id);
            var okObjectResult = result as OkObjectResult;
            var theOperation = okObjectResult.Value as OperationDto;
            
            //Assert
            Assert.NotNull(result);
            Assert.IsType<OperationDto>(theOperation);
            Assert.Equal(id, theOperation.OperationId);
        }
        
        [Fact]
        public async Task GetNotFound_ShouldReturnBadRequestWhenOperationIdIsUnknown()
        {
            //Arrange
            const int id = -1;

            //Act
            var result = theController.GetById(id);

            //Assert
            Assert.IsType<BadRequestObjectResult>(result);
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

        [Fact]
        public async Task PostOperation_ShouldReturnCreateAnOperation()
        {
            //Arrange
            var operationName = "operationPost";
            
            var request = new CreateOperationDto
            {
                OperationName = operationName,
                ToolId = 1
            };

            //Act
            var response = theController.PostOperation(request);
            var result = response.Result as OkObjectResult;
            var theCreatedOperation = result.Value as OperationDto;
            
            //Assert
            Assert.NotNull(theCreatedOperation);
            Assert.Equal(theCreatedOperation.OperationName, operationName);

        }

    }
}