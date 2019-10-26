using System.Collections.Generic;
using productionApi.Models.Plan;

namespace productionApi.DTO
{
    public class CreatePlanDto
    {
        public ICollection<CreateOperationDto> OperationList { get; set; }

        public CreatePlanDto(ICollection<CreateOperationDto> operations)
        {
            this.OperationList = operations;
        }
    }
}