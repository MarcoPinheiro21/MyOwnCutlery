using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using factoryApi.Model.ProductionLine;

namespace factoryApi.Controllers
{
    [Route("api/productionline")]
    [ApiController]
    public class ProductionLineController : ControllerBase
    {
        private readonly ProductionLineContext _context;

        public ProductionLineController(ProductionLineContext context)
        {
            _context = context;
        }
    }
}