namespace productionApi.DTO
{
    public class CreateOperationDto
    {
       
        public long OperationId { get; set; }
        public string Tool { get; set; }
        public string Type { get; set; }

        public CreateOperationDto(long id)
        {
            this.OperationId = id;
            
        }
    }
}