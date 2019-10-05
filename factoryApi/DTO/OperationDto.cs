using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class OperationDto
    {
        private long Id { get; set; }
        private List<long> ToolsId { get; set; }
        private List<long> OperationTypesId { get; set; }
    }
}