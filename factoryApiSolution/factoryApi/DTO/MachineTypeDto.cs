using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class MachineTypeDto
    {
        public long Id { get; set; }
        public string Desc { get; set; }

        public ICollection<string> OperationList { get; set; }

        public MachineTypeDto(long id, string desc, ICollection<string> operationList)
        {
            Id = id;
            Desc = desc;
            OperationList = operationList;
        }
    }
}