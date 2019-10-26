using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.Operation
{
    public class OperationType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long OperationTypeId { get; set; }
        public string OperationTypeName { get; set; }

        public OperationType(string operationTypeName)
        {
            OperationTypeName = operationTypeName;
        }
    }
}