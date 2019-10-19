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

        public string PlanName { get; set; }

        [ForeignKey("OperationId")] 
        public virtual ICollection<Operation> Operations { get; set; }

        public Plan(string planName)
        {
            this.PlanName = (planName == null || planName.Equals(""))
                ? throw new ArgumentNullException("Name cannot be null or empty!")
                : planName;
            
        }

        protected Plan()
        {
        }

        public PlanDto toDto()
        {
            PlanDto planDto = new PlanDto();
            planDto.PlanId = this.PlanId;
            planDto.PlanName = this.PlanName;
            planDto.Operations = this.Operations;
            return planDto;
        }
    }
}