using Microsoft.EntityFrameworkCore;
using factoryApi.Model.ProductionLine;

namespace factoryApi.Model.ProductionLine
{
    public class ProductionLineContext : DbContext
    {
        public ProductionLineContext(DbContextOptions<ProductionLineContext> options)
            : base(options)
        {
        }

        public DbSet<ProductionLine> productionLines { get; set; }
    }
}