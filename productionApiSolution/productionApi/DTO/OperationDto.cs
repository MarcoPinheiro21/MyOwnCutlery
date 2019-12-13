namespace productionApi.DTO
{
    public class OperationDto
    {
        public long OperationId { get; set; }
        public string Tool { get; set; }
        public string OperationType { get; set; }
        public long ExecutionTime{ get; set; }
        public long SetupTime{ get; set; }
        
        
    }
}