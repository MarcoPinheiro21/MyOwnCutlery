using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using productionApi.Models.Product;

namespace productionApi.Context
{
    public class MasterProductionContext : DbContext
    {
        private static string _connection = "Server=localhost,1433;Database=ProductionDB;Integrated Security=False;User Id=SA;Password=yourStrong(!)Password;MultipleActiveResultSets=True";
                
        public MasterProductionContext(DbContextOptions<MasterProductionContext> options) : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connection);
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


        }
    }
    
    
}