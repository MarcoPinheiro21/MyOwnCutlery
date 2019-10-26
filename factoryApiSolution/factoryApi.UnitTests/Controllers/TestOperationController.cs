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
        public async Task GetNotFound_ShouldReturnNotFoundWhenOperationIdIsUnknown()
        {
            //Arrange
            const int unknownOperationId = -1;

            //Act
            var result = theController.GetById(unknownOperationId);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result);
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
        public async Task PostOperation_ShouldReturnCreatedOperation()
        {
            //Arrange
            var operationName = "op1";

            var request = new CreateOperationDto
            {
                OperationType = operationName,
                ToolId = 1
            };

            //Act
            var response = theController.PostOperation(request);
            var result = response.Result as CreatedResult;
            var theCreatedOperation = result.Value as OperationDto;

            //Assert
            Assert.NotNull(theCreatedOperation);
            Assert.Equal(theCreatedOperation.OperationType, operationName);
        }

        [Fact]
        public async Task PostOperation_ShouldReturnNotFoundWhenToolIdIsUnknown()
        {
            //Arrange
            var operationName = "anotherOperationToTestPost";
            const int unknownToolId = -1;

            var request = new CreateOperationDto
            {
                OperationType = operationName,
                ToolId = unknownToolId
            };

            //Act
            var response = theController.PostOperation(request).Result;

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }

        [Fact]
        public async Task PutOperation_ShouldReturnUpdatedOperation()
        {
            //Arrange
            var operationName = "op2";
            var operationId = 1;

            var body = new CreateOperationDto
            {
                OperationType = operationName,
                ToolId = 1
            };

            //Act
            var response = theController.Update(operationId, body);
            var result = response as OkObjectResult;
            var theUpdatedOperation = result.Value as OperationDto;

            //Assert
            Assert.NotNull(theUpdatedOperation);
            Assert.Equal(theUpdatedOperation.OperationType, operationName);
        }

        [Fact]
        public async Task PutOperation_ShouldReturnNotFoundWhenOperationIdIsUnknown()
        {
            //Arrange
            var operationName = "op3";
            var operationId = -1;
            const int unknownToolId = 1;

            var body = new CreateOperationDto
            {
                OperationType = operationName,
                ToolId = unknownToolId
            };

            //Act
            var response = theController.Update(operationId, body);

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }

        [Fact]
        public async Task PutOperation_ShouldReturnNotFoundWhenToolIdIsUnknown()
        {
            //Arrange
            var operationName = "op3";
            var operationId = 1;
            const int unknownToolId = -1;

            var body = new CreateOperationDto
            {
                OperationType = operationName,
                ToolId = unknownToolId
            };

            //Act
            var response = theController.Update(operationId, body);

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }

        [Fact]
        public async Task DeleteOperation_ShouldReturnDeletedOperation()
        {
            //Arrange    
            const int id = 1;

            //Act
            var result = theController.Delete(id);
            var okObjectResult = result as OkObjectResult;
            var theOperation = okObjectResult.Value as OperationDto;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<OperationDto>(theOperation);
            Assert.Equal(id, theOperation.OperationId);
        }

        [Fact]
        public async Task DeleteOperation_ShouldReturnNotFoundWhenOperationIdIsUnknown()
        {
            //Arrange
            const int unknownOperationId = -1;

            //Act
            var result = theController.Delete(unknownOperationId);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}