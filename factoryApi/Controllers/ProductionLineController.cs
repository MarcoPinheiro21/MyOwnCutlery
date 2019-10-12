using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/productionline")]
    [ApiController]
    public class ProductionLineController : ControllerBase
    {
        private readonly ProductionLineService _service;

        public ProductionLineController(MasterFactoryContext context)
        {
            _service = new ProductionLineService(new ProductionLineRepository(context));
        }

        // GET factoryapi/productionsLines/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult GetById(int id)
        {
            return Ok(_service.FindById(id));
        }

        // GET: factoryapi/productionLines
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductionLineDto>))]
        public ActionResult GetOperations()
        {
            return Ok(_service.FindAll());
        }

        // POST: factoryapi/productionLines
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult<ProductionLineDto> PostOperation(CreateProductionLineDto productionLineDto)
        {
            return Ok(_service.Add(productionLineDto));
        }
        
        // PUT factoryapi/productionLines/5
        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        public ActionResult Update(long id, [FromBody] CreateProductionLineDto productionLineDto)
        {
            ProductionLineDto result = _service.Update(id, productionLineDto);
            return Ok(result);
        }
    }
}