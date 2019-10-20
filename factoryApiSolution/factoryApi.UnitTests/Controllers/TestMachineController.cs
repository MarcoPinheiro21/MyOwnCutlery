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
    public class TestMachineController
    {
        private MasterFactoryContext _context = MasterFactoryMockContext.GetMasterFactoryContextMock();

        private MachinesController theController;

        public TestMachineController()
        {
            theController = new MachinesController(_context);
        }

        [Fact]
        public async Task GetAMachine_ShouldReturnTheSpecifiedMachine()
        {
            //Arrange
            const long id = 1;

            //Act
            var result = theController.GetMachine(id);
            var okObjectResult = result as OkObjectResult;
            var theMachine = okObjectResult.Value as MachineDto;

            //Assert
            Assert.NotNull(result);
            Assert.IsType<MachineDto>(theMachine);
            Assert.Equal(id, theMachine.Id);
        }

        [Fact]
        public async Task GetAMachine_ShouldReturnNotFoundWhenOperationIdIsUnknown()
        {
            //Arrange
            const long id = 0;

            //Act
            var result = theController.GetMachine(id);

            //Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetAllMachines_ShouldReturnAllMachines()
        {
            //Arrange
            const int expectedCount = 4;

            //Act
            var result = theController.GetMachines();

            //Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);

            var list = okObjectResult.Value as List<MachineDto>;
            Assert.NotNull(list);

            Assert.Equal(expectedCount, list.Count);
        }

        [Fact]
        public async Task PostMachine_ShouldReturnCreatedMachine()
        {
            //Arrange
            var machineName = "machineToTestPost";

            var request = new CreateMachineDto()
            {
                Description = machineName,
                MachineTypeId = 1
            };

            //Act
            var response = theController.PostMachine(request);
            var result = response as OkObjectResult;
            var theCreatedMachine = result.Value as MachineDto;

            //Assert
            Assert.NotNull(theCreatedMachine);
            Assert.Equal(theCreatedMachine.Description, machineName);
        }

        [Fact]
        public async Task PostMachine_ShouldReturnBadRequestWhenTypeIdIsUnknown()
        {
            //Arrange
            var machineName = "anotherMachineToTestPost";
            const long unknownMachineTypeId = 0;

            var request = new CreateMachineDto()
            {
                Description = machineName,
                MachineTypeId = unknownMachineTypeId
            };

            //Act
            var response = theController.PostMachine(request);

            //Assert
            Assert.IsType<BadRequestObjectResult>(response);
        }

        [Fact]
        public async Task PutMachine_ShouldReturnUpdatedMachine()
        {
            //Arrange
            var machineName = "machineToTestPost";
            var machineId = 1;

            var body = new CreateMachineDto
            {
                Description = machineName,
                MachineTypeId = machineId
            };

            //Act
            var response = theController.PostMachine(body);
            var result = response as OkObjectResult;
            var theUpdatedMachine = result.Value as MachineDto;

            //Assert
            Assert.NotNull(theUpdatedMachine);
            Assert.Equal(theUpdatedMachine.Description, machineName);
        }
        
        [Fact]
        public async Task PutMachine_ShouldReturnBadRequestWhenMachineTypeIdIsUnknown()
        {
            //Arrange
            var machineName = "machineToTestPost";
            var machineId = 1;
            const long unknownMachineTypeId = -1;
            
            var body = new CreateMachineDto()
            {
                Description = machineName,
                MachineTypeId = unknownMachineTypeId
            };

            //Act
            var response = theController.PutMachine(machineId,body);

            //Assert
            Assert.IsType<BadRequestObjectResult>(response.Result);

        }
        
        [Fact]
        public async Task PutMachine_ShouldReturnBadRequestWhenMachineIdIsUnknown()
        {
            //Arrange
            var machineName = "machineToTestPost";
            var machineId = -1;
            const long machineTypeId = 1;
            
            var body = new CreateMachineDto()
            {
                Description = machineName,
                MachineTypeId = machineTypeId
            };

            //Act
            var response = theController.PutMachine(machineId, body);

            //Assert
            Assert.IsType<BadRequestObjectResult>(response.Result);
        }
        
        [Fact]
        public async Task DeleteMachine_ShouldReturnDeletedMachine()
        {
            //Arrange    
            const long id = 1;

            //Act
            var result = theController.DeleteMachine(id);
            var okObjectResult = result as OkObjectResult;
            var theMachine = okObjectResult.Value as MachineDto;
            
            //Assert
            Assert.NotNull(result);
            Assert.IsType<MachineDto>(theMachine);
            Assert.Equal(id, theMachine.Id);
        }
        
        [Fact]
        public async Task DeleteMachine_ShouldReturnBadRequestWhenMachineIdIsUnknown()
        {
            //Arrange
            const int unknownMachineId = -1;

            //Act
            var result = theController.DeleteMachine(unknownMachineId);

            //Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}