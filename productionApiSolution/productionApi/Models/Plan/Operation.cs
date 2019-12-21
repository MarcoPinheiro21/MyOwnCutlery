using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using productionApi.DTO;

namespace productionApi.Models.Plan
{
    public class Operation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key, Column(Order = 0)]
        public long OperationId { get; set; }
        
        [Key, Column(Order = 1),ForeignKey("Plan")]
        public long PlanId { get; set; } 
        
        public string Tool { get; set; } 
        public string OperationType { get; set; } 
        public long ExecutionTime { get; set; } 
        public long SetupTime { get; set; } 
        
        public long Order { get; set; }
        
        public Operation(long OperationId,string tool,string type,
            long execution, long setup, long order)
        {
            this.OperationId = OperationId;
            this.Tool = tool;
            this.OperationType = type;
            this.ExecutionTime = execution;
            this.SetupTime = setup;
            this.Order = order;
        }

        protected Operation()
        {
        }
        
        public OperationDto toDto()
        {
            OperationDto dto = new OperationDto();
            dto.OperationId = this.OperationId;
            dto.Tool = this.Tool;
            dto.OperationType = this.OperationType;
            dto.ExecutionTime = this.ExecutionTime;
            dto.SetupTime = this.SetupTime;
            dto.Order = this.Order;
            return dto;
        }
    }
}