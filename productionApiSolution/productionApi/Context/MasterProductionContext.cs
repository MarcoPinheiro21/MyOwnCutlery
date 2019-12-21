using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using productionApi.Models.Plan;
using productionApi.Models.Product;

namespace productionApi.Context
{
    public class MasterProductionContext : DbContext
    {
        private string _connection;
                
        public MasterProductionContext(IConfiguration configuration, DbContextOptions<MasterProductionContext> options) : base(options)
        {
            _connection = configuration["ConnectionString:productionDB"];
        }
        
        public MasterProductionContext(DbContextOptions<MasterProductionContext> options) : base(options)
        {
            
        }
                
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connection);
            }
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Operation> Operations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(pr => pr.Plan);

            modelBuilder.Entity<Plan>()
                .HasMany(pl => pl.OperationList);

            modelBuilder.Entity<Operation>().HasKey(p => new {p.PlanId, p.OperationId});

        }
    }
    
    
}