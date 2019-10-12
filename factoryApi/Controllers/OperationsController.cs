using System;
using System.Collections.Generic;
using System.Linq;
using factoryApi.Bootstrap;
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
            
            //Charges all the tools needed.
            BootstrapTools bootstrapTools = new BootstrapTools(context);
            bootstrapTools.Execute();
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
        [ProducesResponseType(200, Type = typeof(OperationDto))]
        [ProducesResponseType(404)]
        public ActionResult<OperationDto> PostOperation(CreateOperationDto operationDto)
        {
            return Ok(_service.Add(operationDto));
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}