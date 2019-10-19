using factoryApi.Bootstrap;
using factoryApi.Models.Machine;
using factoryApi.Models.Operation;
using factoryApi.Models.Relationships;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace factoryApi.Context
{
    public class MasterFactoryContext : DbContext
    {
        private static string _connection =
            "Server=localhost,1433;Database=FactoryDB;Integrated Security=False;User Id=SA;Password=yourStrong(!)Password;MultipleActiveResultSets=True";

        public MasterFactoryContext(DbContextOptions<MasterFactoryContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connection);
            }
        }

        public DbSet<Machine> Machines { get; set; }

        public DbSet<Models.Operation.Operation> Operations { get; set; }

        public DbSet<Tool> Tools { get; set; }

        public DbSet<MachineType> MachineTypes { get; set; }

        public DbSet<Models.ProductionLine.ProductionLine> ProductionLines { get; set; }

        public DbSet<OperationMachineType> OperationMachineTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Machine>()
                .HasOne(t => t.Type);

            modelBuilder.Entity<Operation>()
                .HasMany(o => o.OperationMachineType);
            
            modelBuilder.Entity<OperationMachineType>()
                .HasKey(omt => new {omt.OperationId, omt.MachineTypeId});

            modelBuilder.Entity<OperationMachineType>()
                .HasOne(omt => omt.MachineType)
                .WithMany(o => o.OperationMachineType)
                .HasForeignKey(ok => ok.MachineTypeId);

            modelBuilder.Entity<OperationMachineType>()
                .HasOne(omt => omt.Operation)
                .WithMany(mt => mt.OperationMachineType)
                .HasForeignKey(ok => ok.OperationId);
        }
    }
}