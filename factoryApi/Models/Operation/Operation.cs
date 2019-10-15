using System;
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
        
        public string OperationName { get; set; }

        public Tool Tool { get; set; }
        [ForeignKey("MachineTypeId")]
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }
        
        public Operation(string operationName, Tool tool)
        {
            this.OperationName = (operationName == null || operationName.Equals(""))
                ? throw new ArgumentNullException("Operation name cannot be null or empty!")
                : operationName;
            this.Tool = (!tool.isValid()) ?
                        throw new ArgumentNullException("Tool cannot be null or empty!") :
                        tool;
        }

        protected Operation()
        {
        }

        public OperationDto toDto()
        {
            OperationDto operationDto = new OperationDto();
            operationDto.OperationId = this.OperationId;
            operationDto.OperationName = this.OperationName;
            operationDto.ToolId = this.Tool.ToolId;
            return operationDto;
        }
    }
}