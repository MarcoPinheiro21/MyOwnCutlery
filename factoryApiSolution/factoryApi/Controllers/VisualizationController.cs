using System;
using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("visualization")]
    [ApiController]
    public class VisualizationController : ControllerBase
    {
        private readonly MachineService _machineService;
        private readonly ProductionLineService _productionLineService;

        public VisualizationController(MasterFactoryContext context)
        {
            _machineService = new MachineService(
                new MachineRepository(context),
                new MachineTypeRepository(context),
                new OperationRepository(context));
            _productionLineService= new ProductionLineService(
                new ProductionLineRepository(context));
        }
        
        // GET: visualization/productionlines
        [HttpGet("productionlines")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductionLineDto>))]
        public ActionResult GetProductionLines()
        {
            return Ok(_productionLineService.FindAll());
        }
        
        // GET: visualization/machines/types
        [HttpGet("machines/types")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineTypeDto>))]
        [ProducesResponseType(404)]
        public ActionResult GetMachineTypes()
        {
            return Ok(_machineService.FindAllMachineTypes());
        }
        
        // PUT: visualization/machines/types/5/
        [HttpPut("machines/types/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineTypeDto>))]
        [ProducesResponseType(404)]
        public ActionResult<MachineTypeDto> PutMachineTypeOperations(long id, MachineTypeDto machineTypeDto)
        {
            try
            {
                return Ok(_machineService.UpdateVisualizationModelOfMachineType(id, machineTypeDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }
        // PUT: visualization/machines/5/
        [HttpPut("machines/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineDto>))]
        [ProducesResponseType(404)]
        public ActionResult<MachineTypeDto> PutMachineTypeOperations(long id, MachineDto machineDto)
        {
            try
            {
                return Ok(_machineService.UpdatePositionOfMachine(id, machineDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }
        
    }
}



