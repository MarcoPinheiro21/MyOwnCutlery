namespace productionApi.DTO
{
    public class FactoryApiOperationDto
    {
        public long operationId { get; set; }
        public long toolId { get; set; }
        public string operationType { get; set; }

        public FactoryApiOperationDto()
        {
            
        }
        public FactoryApiOperationDto(long OId, long TId, string OName)
        {
            this.operationId = OId;
            this.toolId = TId;
            this.operationType = OName;
        }
    }
}