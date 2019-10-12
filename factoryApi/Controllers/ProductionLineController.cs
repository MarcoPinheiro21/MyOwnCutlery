using factoryApi.Context;
using factoryApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace factoryApi.Controllers
{
    [Route("factoryapi/productionline")]
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