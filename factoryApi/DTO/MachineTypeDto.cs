using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class MachineTypeDto
    {
        public long Id { get; set; }
        public string Desc { get; set; }

        public List<string> OperationList { get; set; }

        public MachineTypeDto(long id, string desc, List<string> operationList)
        {
            Id = id;
            Desc = desc;
            OperationList = operationList;
        }
    }
}