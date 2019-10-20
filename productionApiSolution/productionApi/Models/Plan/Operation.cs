namespace productionApi.Models.Plan
{
    public class Operation
    {
        public long OperationId { get; set; }
        
        public Operation(long OperationId)
        {
            this.OperationId = OperationId;

        }

        protected Operation()
        {
        }
    }
}