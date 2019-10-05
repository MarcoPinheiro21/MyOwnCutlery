using Microsoft.EntityFrameworkCore;

namespace factoryApi.Model.Operation
{
    public class OperationContext: DbContext
    {
        public OperationContext(DbContextOptions<OperationContext> options)
            : base(options)
        {
        }

        public DbSet<Operation> Operations { get; set; }
    }
}