using System.Collections.Generic;
using System.Linq;
using factoryApi.Models;
using factoryApi.Models.Operation;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/operations/")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        private readonly MasterFactoryContext _context;

        public OperationsController(MasterFactoryContext context)
        {
            _context = context;
        }

        // GET factoryapi/operations/5
        [HttpGet("{id}")]
        public ActionResult<Operation> GetOperation(long id)
        {
            var operation = _context.Operations.Find(id);

            if (operation == null)
            {
                return NotFound();
            }

            return operation;
        }
        
        // GET: factoryapi/operations
        [HttpGet]
        public List<Operation> GetOperations()
        {
            return _context.Operations.ToList();
        }

        // POST: factoryapi/operations
        [HttpPost]
        public ActionResult<Operation> PostOperation([FromBody]Operation operation)
        {
            _context.Operations.Add(operation); 
            _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOperation), new { Id = operation.Id }, operation);
        }
    }
}