using Microsoft.EntityFrameworkCore;

namespace FactoryApi.Model.ProductionLine
{
    public class ProductionLineContext : DbContext
    {
        public TodoContext(DbContextOptions<ProductionLineContext> options)
            : base(options)
        {
        }

        public DbSet<ProductionLine> productionLines { get; set; }
    }
}