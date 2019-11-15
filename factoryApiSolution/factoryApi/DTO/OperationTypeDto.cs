namespace factoryApi.DTO
{
    public class OperationTypeDto
    {
        public long OperationTypeId { get; set; }
        
        public string Desc { get; set; }

        public long ExecutionTime { get; set; }

        public long SetupTime { get; set; }
    }
}