using System;
using System.Collections.Generic;
using factoryApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Repositories;
using productionApi.Services;

namespace productionApi.Controllers
{

    [Route("productionapi/products/")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductsController(MasterProductionContext context)
        {
            _service = new ProductService(new ProductRepository(context));
            
        }

        // GET productionapi/products/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
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

        // GET: productionapi/products
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ProductDto>))]
        public ActionResult GetProducts()
        {
            return Ok(_service.FindAll());
        }

        // POST: productionapi/products
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
        [ProducesResponseType(404)]
        public ActionResult<ProductDto> PostProduct(CreateProductDto productDto)
        {
            try
            {
                return Ok(_service.Add(productDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        // PUT productionapi/products/5
        [HttpPut("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
        [ProducesResponseType(404)]
        public ActionResult Update(long id, [FromBody] CreateProductDto productDto)
        {
            try
            {
                return Ok(_service.Update(id, productDto));
            }
            catch (ObjectNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }
            
        // DELETE productionapi/products/5
        [HttpDelete("{id}")]
        [ProducesResponseType(200, Type = typeof(ProductDto))]
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