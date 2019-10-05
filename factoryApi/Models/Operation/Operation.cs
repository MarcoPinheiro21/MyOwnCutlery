using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.Operation
{
    public class Operation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long Id { get; set; }

        private Tool Tools { get; set; }
        private OperationType OperationTypes { get; set; }
    }
}