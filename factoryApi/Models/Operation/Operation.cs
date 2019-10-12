using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public OperationType OperationType { get; set; }

        public OperationDto toDto()
        {
            OperationDto operationDto = new OperationDto();
            operationDto.Id = OperationId;
            operationDto.ToolDesc = Tool.Desc;
            operationDto.OperationTypeDesc = OperationType.Desc;
            return operationDto;
        }
    }
}