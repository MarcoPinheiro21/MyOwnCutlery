using factoryApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("api/productionline")]
    [ApiController]
    public class ProductionLineController : ControllerBase
    {
        private readonly MasterFactoryContext _context;

        public ProductionLineController(MasterFactoryContext context)
        {
            _context = context;
        }
    }
}