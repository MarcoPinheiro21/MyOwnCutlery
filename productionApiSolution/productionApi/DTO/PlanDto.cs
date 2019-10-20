using System.Collections.Generic;
using productionApi.Models.Plan;

namespace productionApi.DTO
{
    public class PlanDto
    {
        public long PlanId { get; set; }
        public ICollection<Operation> Operations { get; set; }
    }
}