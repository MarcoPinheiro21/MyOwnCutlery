namespace productionApi.DTO
{
    public class FactoryApiOperationDto
    {
        public long operationId { get; set; }
        
        public long toolId { get; set; }
        public string tool { get; set; }
        public OperationTypeDto operationType { get; set; }

        public FactoryApiOperationDto()
        {
            
        }
        public FactoryApiOperationDto(long OId, string t, long toolId, OperationTypeDto operationType)
        {
            this.operationId = OId;
            this.toolId = toolId;
            this.tool = t;
            this.operationType = operationType;
        }
    }
}