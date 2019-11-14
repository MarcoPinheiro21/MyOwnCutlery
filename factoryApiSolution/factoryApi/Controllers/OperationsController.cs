using System.Collections.Generic;
using factoryApi.Bootstrap;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Models.Operation;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            //Charges all the tools needed.
            BootstrapTools bootstrapTools = new BootstrapTools(context);
            bootstrapTools.Execute();

            //Charges all the operationTypes needed.
            BootstrapOperationTypes bootstrapOperationTypes = new BootstrapOperationTypes(context);
            bootstrapOperationTypes.Execute();
        }

        // GET factoryapi/operations/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult GetById(int id)
        {
            try
            {
                return Ok(_service.FindById(id));
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
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
        [ProducesResponseType(201, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult<OperationDto> PostOperation(CreateOperationDto operationDto)
        {
            try
            {
                return Created("default", _service.Add(operationDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (DuplicatedObjectException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT factoryapi/operations/5
        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult Update(long id, [FromBody] CreateOperationDto operationDto)
        {
            try
            {
                return Ok(_service.Update(id, operationDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (DuplicatedObjectException e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE factoryapi/operations/5
        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult Delete(long id)
        {
            try
            {
                return Ok(_service.Delete(id));
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        // GET: factoryapi/operations/tools
        [HttpGet("tools")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Tool>))]
        public ActionResult GetTools()
        {
            return Ok(_service.FindAllTools());
        }
        
        // GET: factoryapi/operations/operationTypes
        [HttpGet("operationTypes")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OperationType>))]
        public ActionResult GetOperationTypes()
        {
            return Ok(_service.FindAllOperationTypes());
        }
    }
}