namespace productionApi.DTO
{
    public class FactoryApiOperationDto
    {
        public long operationId { get; set; }
        public string tool { get; set; }
        public string operationType { get; set; }

        public FactoryApiOperationDto()
        {
            
        }
        public FactoryApiOperationDto(long OId, string t, string OName)
        {
            this.operationId = OId;
            this.tool = t;
            this.operationType = OName;
        }
    }
}