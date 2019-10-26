using System.Collections.Generic;
using System.Threading.Tasks;
using factoryApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using productionApi.Context;
using productionApi.Controllers;
using productionApi.DTO;
using productionApiTest.Context;
using Xunit;

namespace productionApiTest.Controllers

{
    public class TestProductController
    {
        private MasterProductionContext _context = MasterProductionMockContext.GetMasterProductionContextMock();

        private ProductsController theController;

        public TestProductController()
        {
            theController = new ProductsController(_context);
        }

        [Fact]
        public async Task GetAProduct_ShouldReturnTheSpecifiedProduct()
        {
            //Arrange    
            const int id = 1;

            //Act
            var result = theController.GetById(id);
            var okObjectResult = result as OkObjectResult;
            var theProduct = okObjectResult.Value as ProductDto;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<ProductDto>(theProduct);
            Assert.Equal(id, theProduct.ProductId);
        }

        [Fact]
        public async Task GetNotFound_ShouldReturnNotFoundWhenProductIdIsUnknown()
        {
            //Arrange
            const int unknownProductId = -1;

            //Act
            var result = theController.GetById(unknownProductId);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetAllProducts_ShouldReturnAllProducts()
        {
            //Arrange
            const int expectedCount = 2;

            //Act
            var result = theController.GetProducts();

            //Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);

            List<ProductDto> list = okObjectResult.Value as List<ProductDto>;
            Assert.NotNull(list);

            Assert.Equal(expectedCount, list.Count);
        }

        [Fact]
        public async Task PostProduct_ShouldReturnCreatedProduct()
        {
            //Arrange
            var productName = "productToTestPost";
            List<CreateOperationDto> operationsList = new List<CreateOperationDto>();
            operationsList.Add(new CreateOperationDto(6));
            operationsList.Add(new CreateOperationDto(7));

            CreatePlanDto plan = new CreatePlanDto(operationsList);

            var request = new CreateProductDto(productName, plan);

            //Act
            var response = theController.PostProduct(request);
            var result = response.Result as CreatedResult;
            var theCreatedProduct = result.Value as ProductDto;

            //Assert
            Assert.NotNull(theCreatedProduct);
            Assert.Equal(theCreatedProduct.ProductName, productName);
        }

        /*[Fact]
        public async Task PostProduct_ShouldReturnNotFoundWhenMachineIdIsUnknown()
        {
            //Arrange
            var productName = "anotherProductToTestPost";
            const int unknownMachineId = -1;
            List<long> machinesList = new List<long>();
            machinesList.Add(unknownMachineId);

            var request = new CreateProductDto(productName, machinesList);

            //Act
            var response = theController.PostProduct(request).Result;

            //Assert
            Assert.IsType<NotFoundObjectResult>(response);
        }*/

        [Fact]
        public async Task GetProductPlan_ShouldReturnPlanOfAGivenProductId()
        {
            //Arrange
            const long id = 2L;

            //Act
            var result = theController.GetProductPlan(id);
            var okObjectResult = result.Result as OkObjectResult;
            var theOperations = okObjectResult.Value as List<OperationDto>;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<List<OperationDto>>(theOperations);
        }

        [Fact]
        public async Task GetProductPlan_ShouldReturnNotFoundWhenProductIdIsUnknown()
        {
            //Arrange
            const long id = -1;

            //Act
            var result = theController.GetProductPlan(id);

            //Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }
    }
}