using Microsoft.EntityFrameworkCore;

namespace factoryApi.Models
{
    public class MasterFactoryContext : DbContext
    {
        private static string _connection = "Server=tcp:<serverName>,<port>;" +
                                            "Database=<databaseName>;" +
                                            "Uid=<uid>;" +
                                            "Pwd=<password>";

        public MasterFactoryContext(DbContextOptions<MasterFactoryContext> options)
            : base(options)
        {
        }

        public DbSet<Machine.Machine> Machines { get; set; }

        public DbSet<Operation.Operation> Operations { get; set; }

        public DbSet<ProductionLine.ProductionLine> productionLines { get; set; }
    }
}