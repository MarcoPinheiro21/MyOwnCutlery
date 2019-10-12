using Microsoft.EntityFrameworkCore;

namespace factoryApi.Context
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
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Models.Machine.Machine> Machines { get; set; }

        public DbSet<Models.Operation.Operation> Operations { get; set; }

        public DbSet<Models.ProductionLine.ProductionLine> ProductionLines { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new OperationConfiguration());
            base.OnModelCreating(builder);
        }

    }
    
    
}