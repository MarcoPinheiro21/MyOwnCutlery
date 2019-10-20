using System.Collections.Generic;
using factoryApi.Context;
using factoryApi.DTO;
using factoryApi.Exceptions;
using factoryApi.Repositories;
using factoryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/productionlines")]
    [ApiController]
    public class ProductionLineController : ControllerBase
    {
        private readonly ProductionLineService _service;

        public ProductionLineController(MasterFactoryContext context)
        {
            _service = new ProductionLineService(new ProductionLineRepository(context));
        }

        // GET factoryapi/productionlines/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult GetById(int id)
        {
            try
            {
                return Ok(_service.FindById(id));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: factoryapi/productionlines
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductionLineDto>))]
        public ActionResult GetProductionLines()
        {
            return Ok(_service.FindAll());
        }

        // POST: factoryapi/productionlines
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult<ProductionLineDto> PostProductionLine(CreateProductionLineDto productionLineDto)
        {
            try
            {
                return Ok(_service.Add(productionLineDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT factoryapi/productionlines/5
        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult Update(long id, [FromBody] CreateProductionLineDto productionLineDto)
        {
            try
            {
                return Ok(_service.Update(id, productionLineDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE factoryapi/productionlines/5
        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductionLineDto))]
        [ProducesResponseType(404)]
        public ActionResult Delete(long id)
        {
            try
            {
                return Ok(_service.Delete(id));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}