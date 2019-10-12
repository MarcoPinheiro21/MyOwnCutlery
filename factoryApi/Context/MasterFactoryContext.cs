using factoryApi.Models.Machine;
using factoryApi.Models.Relationships;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new OperationConfiguration());
            base.OnModelCreating(modelBuilder);


            //modelBuilder.Entity<Machine.Machine>().HasKey(m => new {m.MachineId});
            //modelBuilder.Entity<MachineType>().HasKey(mt => new {mt.MachineTypeId});
            
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