using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.Models.Machine;
using factoryApi.Models.Relationships;
using factoryApi.DTO;
using factoryApi.Repositories;

namespace factoryApi.Models.Operation
{
    public class Operation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long OperationId { get; set; }

        public Tool Tool { get; set; }
        [ForeignKey("MachineTypeId")]
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }

        public OperationDto toDto()
        {
            OperationDto operationDto = new OperationDto();
            operationDto.Id = OperationId;
            operationDto.ToolDesc = Tool.Desc;
            return operationDto;
        }
    }
}