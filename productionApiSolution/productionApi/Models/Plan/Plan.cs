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
        public virtual ICollection<Operation> OperationList { get; set; }

        public Plan(ICollection<Operation> operationList)
        {
            this.OperationList = operationList;

        }

        protected Plan()
        {
        }

        public PlanDto toDto()
        {
            PlanDto planDto = new PlanDto();
            planDto.PlanId = this.PlanId;
            planDto.OperationList = this.OperationList;
            return planDto;
        }
    }
}