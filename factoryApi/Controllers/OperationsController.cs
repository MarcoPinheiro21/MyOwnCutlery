using System.Collections.Generic;
using System.Linq;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Models;
using factoryApi.Models.Operation;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/operations/")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        private readonly OperationService _service;

        public OperationsController(MasterFactoryContext context)
        {
            _service = new OperationService(new OperationRepository(context));
        }

        // GET factoryapi/operations/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult GetById(int id)
        {
            return Ok(_service.FindById(id));
        }

        // GET: factoryapi/operations
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OperationDto>))]
        public ActionResult GetOperations()
        {
            return Ok(_service.FindAll());
        }

        // POST: factoryapi/operations
        [HttpPost]
        public ActionResult<OperationDto> PostOperation([FromBody]OperationDto operationDto)
        {
            _service.Add(operationDto);
            return CreatedAtAction(nameof(GetOperations), new { Id = operationDto.Id }, operationDto);
        }
    }
}