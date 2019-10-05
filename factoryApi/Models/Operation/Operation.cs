using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.Operation
{
    public class Operation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        private long Id { get; set; }

        private ICollection<Tool> Tools { get; set; }
        private ICollection<OperationType> OperationTypes { get; set; }
    }
}