using System.Collections.Generic;

namespace factoryApi.Models.Machine
{
    public class MachineType
    {
        public string Desc { get; set; }
        public ICollection<Operation.Operation> Operations { get; set; }
    }
}