namespace productionApi.DTO
{
    public class OperationTypeDto
    {
        public long operationTypeId { get; set; }
        
        public string desc { get; set; }

        public long executionTime { get; set; }

        public long setupTime { get; set; }

        public OperationTypeDto()
        {
        }

        public OperationTypeDto(long operationTypeId, string desc, long executionTime, long setupTime)
        {
            this.operationTypeId = operationTypeId;
            this.desc = desc;
            this.executionTime = executionTime;
            this.setupTime = setupTime;
        }
    }

}