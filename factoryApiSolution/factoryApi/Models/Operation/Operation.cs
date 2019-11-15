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
    public class Operation : Entity
    {
        [Column("OperationTypeId")]
        public OperationType OperationType { get; set; }

        [Column("ToolId")]
        public Tool Tool { get; set; }
        
        [ForeignKey("MachineTypeId")]
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }
        
        public Operation(OperationType operationName, Tool tool)
        {
            this.OperationType = (operationName == null || operationName.Equals(""))
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
            operationDto.OperationId = Id;
            operationDto.OperationType = OperationType.toDto();
            operationDto.Tool = Tool.Desc;
            operationDto.ToolId = Tool.ToolId;
            return operationDto;
        }
    }
}