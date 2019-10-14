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
                new MachineTypeRepository(context));
        }


        // GET: factoryapi/machines
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MachineDto>))]
        [ProducesResponseType(404)]
        public IEnumerable<MachineDto> GetMachines()
        {
            return _service.FindAllMachines();
        }

        // GET: factoryapi/machines/5
        [HttpGet("/{id}")]
        [ProducesResponseType(200, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineDto> GetMachine(long id)
        {
            var todoItem = _service.FindMachineById(id);

            if (todoItem == null) return NotFound();

            return todoItem;
        }

        // POST: factoryapi/machines
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(MachineDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineDto> PostMachine(CreateMachineDto createMachineDto)
        {
            try
            {
                return _service.AddMachine(createMachineDto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        // POST: factoryapi/machines/type
        [HttpPost("types")]
        [ProducesResponseType(200, Type = typeof(MachineTypeDto))]
        [ProducesResponseType(404)]
        public ActionResult<MachineTypeDto> PostMachineType(CreateMachineTypeDto createMachineTypeDto)
        {
            try
            {
                return _service.AddMachineType(createMachineTypeDto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }
    }
}