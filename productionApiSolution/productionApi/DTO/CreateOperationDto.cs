﻿namespace productionApi.DTO
{
    public class CreateOperationDto
    {
       
        public long OperationId { get; set; }
        public string Tool { get; set; }
        public string Type { get; set; }
        public long Order { get; set; }
        public long ExecutionTime { get; set; }
        public long SetupTime { get; set; }

        public CreateOperationDto(long id, long order)
        {
            this.OperationId = id;
            this.Order = order;
        }
    }
}