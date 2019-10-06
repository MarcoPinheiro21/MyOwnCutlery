using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using factoryApi.Models;
using factoryApi.Models.Machine;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/machines")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly MasterFactoryContext _context;

        public MachinesController(MasterFactoryContext context)
        {
            _context = context;
        }


        // GET: factoryapi/machines
        [HttpGet]
        public IEnumerable<Machine> GetMachines()
        {
            return _context.Machines.ToList();
        }

        // GET: factoryapi/machines/5
        [HttpGet("/{id}")]
        public async Task<ActionResult<Machine>> GetMachine(long id)
        {
            var todoItem = await _context.Machines.FindAsync(id);

            if (todoItem == null) return NotFound();

            return todoItem;
        }
    }
}