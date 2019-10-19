using System.Collections.Generic;
using productionApi.Models.Plan;

namespace productionApi.DTO
{
    public class CreatePlanDto
    {
        public string PlanName { get; set; }
        public ICollection<Operation> Operations { get; set; }
    }
}