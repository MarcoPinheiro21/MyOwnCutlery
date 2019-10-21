using System;
using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/machines")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly MachineService _service;

        public MachinesController(MasterFactoryContext context)
        {
            _service = new MachineService(
                new MachineRepository(context),
                new MachineTypeRepository(context),
                new OperationRepository(context));
        }

        // GET: factoryapi/machines
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineDto>))]
        [ProducesResponseType(404)]
        public ActionResult GetMachines()
        {
            if (null != Request && Request.Query.ContainsKey("type"))
            {
                try
                {
                    return Ok(_service.FindMachineByType(long.Parse(Request.Query["type"])));
                }
                catch (FormatException e)
                {
                    Console.WriteLine(e);
                    return BadRequest("Type must be a number.");
                }
            }

            return Ok(_service.FindAllMachines());
        }

        // GET: factoryapi/machines/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult GetMachine(long id)
        {
            try
            {
                var machine = _service.FindMachineById(id);
                return Ok(machine);
            }
            catch (ObjectNotFoundException e)
            {
                Console.WriteLine(e);
                return NotFound();
            }
        }

        // POST: factoryapi/machines
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineDto> PostMachine(CreateMachineDto createMachineDto)
        {
            try
            {
                return Created("default", _service.AddMachine(createMachineDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // PUT: factoryapi/machines/5
        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineDto> PutMachine(long id, [FromBody] CreateMachineDto createMachineDto)
        {
            try
            {
                return Ok(_service.UpdateMachine(id, createMachineDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // DELETE: factoryapi/machines/5
        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult DeleteMachine(long id)
        {
            try
            {
                var machine = _service.DeleteMachine(id);
                return Ok(machine);
            }
            catch (ObjectNotFoundException e)
            {
                Console.WriteLine(e);
                return NotFound();
            }
        }

        //MachineTypes

        // GET: factoryapi/machines/types
        [HttpGet("types")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineTypeDto>))]
        [ProducesResponseType(404)]
        public ActionResult GetMachineTypes()
        {
            return Ok(_service.FindAllMachineTypes());
        }

        // GET: factoryapi/machines/types/5
        [HttpGet("types/{id}")]
        [ProducesResponseType(200, Type = typeof(MachineTypeDto))]
        [ProducesResponseType(404)]
        public ActionResult GetMachineType(long id)
        {
            try
            {
                var machineType = _service.FindMachineTypeById(id);
                return Ok(machineType);
            }
            catch (ObjectNotFoundException e)
            {
                Console.WriteLine(e);
                return NotFound();
            }
        }

        // POST: factoryapi/machines/types
        [HttpPost("types")]
        [ProducesResponseType(201, Type = typeof(MachineTypeDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineTypeDto> PostMachineType(CreateMachineTypeDto createMachineTypeDto)
        {
            try
            {
                return Created("default", _service.AddMachineType(createMachineTypeDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // GET: factoryapi/machines/types/5/operations
        [HttpGet("types/{id}/operations")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OperationDto>))]
        [ProducesResponseType(404)]
        public ActionResult<OperationDto> GetMachineTypeOperations(long id)
        {
            try
            {
                return Ok(_service.FindOperationByMachineType(id));

            }
            catch (ObjectNotFoundException e)
            {
                Console.WriteLine(e);
                return NotFound(e);
            }
        }

        // PUT: factoryapi/machines/types/5/operations
        [HttpPut("types/{id}/operations")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineTypeDto>))]
        [ProducesResponseType(404)]
        public ActionResult<MachineTypeDto> PutMachineTypeOperations(long id, CreateMachineTypeDto createMachineTypeDto)
        {
            try
            {
                return Ok(_service.UpdateOperationsOfMachineType(id, createMachineTypeDto));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }
    }
}