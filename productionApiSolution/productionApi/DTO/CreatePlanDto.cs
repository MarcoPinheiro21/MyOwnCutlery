using System.Collections.Generic;
using productionApi.Models.Plan;

namespace productionApi.DTO
{
    public class CreatePlanDto
    {
        public ICollection<CreateOperationDto> Operations { get; set; }
    }
}