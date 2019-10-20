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
    public class TestProductionLineController
    {
        private MasterFactoryContext _context = MasterFactoryMockContext.GetMasterFactoryContextMock();

        private ProductionLineController theController;

        public TestProductionLineController()
        {
            theController = new ProductionLineController(_context);
        }

        [Fact]
        public async Task GetAProductionLine_ShouldReturnTheSpecifiedProductionLine()
        {
            //Arrange    
            const int id = 1;

            //Act
            var result = theController.GetById(id);
            var okObjectResult = result as OkObjectResult;
            var theProductionLine = okObjectResult.Value as ProductionLineDto;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<ProductionLineDto>(theProductionLine);
            Assert.Equal(id, theProductionLine.ProductionLineId);
        }

        [Fact]
        public async Task GetNotFound_ShouldReturnNotFoundWhenProductionLineIdIsUnknown()
        {
            //Arrange
            const int unknownProductionLineId = -1;

            //Act
            var result = theController.GetById(unknownProductionLineId);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetAllProductionLines_ShouldReturnAllProductionLines()
        {
            //Arrange
            const int expectedCount = 2;

            //Act
            var result = theController.GetProductionLines();

            //Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);

            List<ProductionLineDto> list = okObjectResult.Value as List<ProductionLineDto>;
            Assert.NotNull(list);

            Assert.Equal(expectedCount, list.Count);
        }

        [Fact]
        public async Task PostProductionLine_ShouldReturnCreatedProductionLine()
        {
            //Arrange
            var productionLineName = "productionLineToTestPost";
            List<long> machinesList = new List<long>();
            machinesList.Add(1);

            var request = new CreateProductionLineDto(productionLineName, machinesList);

            //Act
            var response = theController.PostProductionLine(request);
            var result = response.Result as CreatedResult;
            var theCreatedProductionLine = result.Value as ProductionLineDto;

            //Assert
            Assert.NotNull(theCreatedProductionLine);
            Assert.Equal(theCreatedProductionLine.ProductionLineName, productionLineName);
        }

        [Fact]
        public async Task PostProductionLine_ShouldReturnNotFoundWhenMachineIdIsUnknown()
        {
            //Arrange
            var productionLineName = "anotherProductionLineToTestPost";
            const int unknownMachineId = -1;
            List<long> machinesList = new List<long>();
            machinesList.Add(unknownMachineId);

            var request = new CreateProductionLineDto(productionLineName, machinesList);

            //Act
            var response = theController.PostProductionLine(request).Result;

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }

        [Fact]
        public async Task PutProductionLine_ShouldReturnUpdatedProductionLine()
        {
            //Arrange
            var productionLineName = "productionLineToTestPost";
            var productionLineId = 1;
            List<long> machinesList = new List<long>();
            machinesList.Add(1);

            var body = new CreateProductionLineDto(productionLineName, machinesList);

            //Act
            var response = theController.Update(productionLineId, body);
            var result = response as OkObjectResult;
            var theUpdatedProductionLine = result.Value as ProductionLineDto;

            //Assert
            Assert.NotNull(theUpdatedProductionLine);
            Assert.Equal(theUpdatedProductionLine.ProductionLineName, productionLineName);
        }
        
        [Fact]
        public async Task PutProductionLine_ShouldReturnNotFoundWhenMachineIdIsUnknown()
        {
            //Arrange
            var productionLineName = "anotherProductionLineToTestPost";
            var productionLineId = 1;
            const int unknownToolId = -1;

            List<long> machinesList = new List<long>();
            machinesList.Add(unknownToolId);

            var body = new CreateProductionLineDto(productionLineName, machinesList);

            //Act
            var response = theController.Update(productionLineId, body);

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }

        [Fact]
        public async Task DeleteProductionLine_ShouldReturnDeletedProductionLine()
        {
            //Arrange    
            const int id = 1;

            //Act
            var result = theController.Delete(id);
            var okObjectResult = result as OkObjectResult;
            var theProductionLine = okObjectResult.Value as ProductionLineDto;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<ProductionLineDto>(theProductionLine);
            Assert.Equal(id, theProductionLine.ProductionLineId);
        }

        [Fact]
        public async Task DeleteProductionLine_ShouldReturnNotFoundWhenProductionLineIdIsUnknown()
        {
            //Arrange
            const int unknownProductionLineId = -1;

            //Act
            var result = theController.Delete(unknownProductionLineId);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}