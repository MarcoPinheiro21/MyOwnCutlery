using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.Models.Relationships;

namespace factoryApi.Models.Machine
{
    public class MachineType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public long MachineTypeId { get; set; }
        public string Desc { get; set; }
        [ForeignKey("OperationId")]
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }
    }
}