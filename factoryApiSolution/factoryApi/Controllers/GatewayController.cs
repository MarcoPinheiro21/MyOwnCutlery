using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/gateway/")]
    [ApiController]
    public class GatewayController : ControllerBase
    {
        private readonly OperationService _service;
        
        public GatewayController(MasterFactoryContext context)
        {
            _service = new OperationService(new OperationRepository(context));
        }
        
        // GET: factoryapi/gateway/operations
        [HttpGet("operations")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OperationDto>))]
        public ActionResult GetOperations()
        {
            return Ok(_service.FindAll());
        }
    }
}