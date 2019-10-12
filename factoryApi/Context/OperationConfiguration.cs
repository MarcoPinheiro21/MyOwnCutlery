using factoryApi.Models.Operation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace factoryApi.Context
{
    public class OperationConfiguration : IEntityTypeConfiguration<Operation>
    {
     
        public void Configure(EntityTypeBuilder<Operation> builder)
        {
/*            builder.OwnsOne(op => op.Tool, a =>
            {
                a.Property(t => t.Desc)
                    .HasColumnName("Tool")
                    .HasDefaultValue("");
            });
            builder.OwnsOne(op => op.OperationType, a =>
            {
                a.Property(opt => opt.Desc)
                    .HasColumnName("OperationType")
                    .HasDefaultValue("");
            });*/
            
        }
        
    }
}