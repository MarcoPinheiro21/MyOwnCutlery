using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class CreateMachineTypeDto
    {
        public string Desc { get; set; }
        public List<long> OperationList { get; set; }

        public CreateMachineTypeDto(string desc, List<long> operationList)
        {
            Desc = desc;
            OperationList = operationList;
        }
    }
}