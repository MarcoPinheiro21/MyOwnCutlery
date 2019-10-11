using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Models
{
    public class MasterFactoryContext : DbContext
    {
        private static string _connection = "Server=localhost,1433;Database=FactoryDB;Integrated Security=False;User Id=SA;Password=yourStrong(!)Password;MultipleActiveResultSets=True";
                
        public MasterFactoryContext(DbContextOptions<MasterFactoryContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connection);
        }

        public DbSet<Machine.Machine> Machines { get; set; }

        public DbSet<Operation.Operation> Operations { get; set; }

        public DbSet<ProductionLine.ProductionLine> ProductionLines { get; set; }
    }
    
    
}