using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using productionApi.DTO;

namespace productionApi.Models.Plan
{
    public class Plan
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long PlanId { get; set; }

        [ForeignKey("OperationId")] 
        public virtual ICollection<Operation> Operations { get; set; }

        public Plan(ICollection<Operation> operations)
        {
            this.Operations = operations;

        }

        protected Plan()
        {
        }

        public PlanDto toDto()
        {
            PlanDto planDto = new PlanDto();
            planDto.PlanId = this.PlanId;
            planDto.Operations = this.Operations;
            return planDto;
        }
    }
}