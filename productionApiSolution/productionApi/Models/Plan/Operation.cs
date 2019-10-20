using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using productionApi.DTO;

namespace productionApi.Models.Plan
{
    public class Operation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public long OperationId { get; set; }
        
        [ForeignKey("PlanId")]
        public Plan Plan { get; set; } 
        
        public Operation(long OperationId)
        {
            this.OperationId = OperationId;

        }

        protected Operation()
        {
        }
        
        public OperationDto toDto()
        {
            OperationDto dto = new OperationDto();
            dto.OperationId = this.OperationId;
            return dto;
        }
    }
}