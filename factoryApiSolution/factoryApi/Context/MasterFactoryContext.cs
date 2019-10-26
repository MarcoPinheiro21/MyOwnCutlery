using System.Collections.Generic;
using factoryApi.Models.Machine;
using factoryApi.Models.Operation;
using factoryApi.Models.ProductionLine;
using factoryApi.Models.Relationships;
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

        public DbSet<ProductionLine> ProductionLines { get; set; }

        public DbSet<Machine> Machines { get; set; }

        public DbSet<MachineType> MachineTypes { get; set; }

        public DbSet<Operation> Operations { get; set; }

        public DbSet<Tool> Tools { get; set; }

        public DbSet<OperationType> OperationTypes { get; set; }

        public DbSet<OperationMachineType> OperationMachineTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductionLine>()
                .HasMany(ml => ml.MachinesList);

            modelBuilder.Entity<ProductionLine>()
                .HasIndex(i => i.ProductionLineName)
                .IsUnique();

            modelBuilder.Entity<Machine>()
                .HasOne(pl => pl.ProductionLine);

            modelBuilder.Entity<Machine>()
                .HasOne(t => t.Type);

            modelBuilder.Entity<Machine>()
                .HasIndex(i => i.Description).IsUnique();

            modelBuilder.Entity<MachineType>()
                .HasIndex(i => i.Desc)
                .IsUnique();

            modelBuilder.Entity<Operation>()
                .HasMany(o => o.OperationMachineType);

            modelBuilder.Entity<Operation>()
                .HasIndex("OperationTypeId", "ToolId")
                .IsUnique();

            modelBuilder.Entity<OperationMachineType>()
                .HasKey(omt => new {omt.OperationId, omt.MachineTypeId});

            modelBuilder.Entity<OperationMachineType>()
                .HasOne(omt => omt.MachineType)
                .WithMany(o => o.OperationMachineType)
                .HasForeignKey(ok => ok.MachineTypeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OperationMachineType>()
                .HasOne(omt => omt.Operation)
                .WithMany(mt => mt.OperationMachineType)
                .HasForeignKey(ok => ok.OperationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}