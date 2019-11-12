using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class OperationDto
    {
        public long OperationId { get; set; }
        public long ToolId { get; set; }
        public string Tool { get; set; }
        public long OperationTypeId { get; set; }
        public string OperationType { get; set; }
    }
}