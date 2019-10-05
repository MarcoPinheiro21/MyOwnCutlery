using System.Collections.Generic;

namespace factoryApi.Model
{
    public class MachineType
    {
        private string Desc { get; set; }
        private List<Operation> Operations { get; set; }

        protected MachineType(string desc, List<Operation> operations)
        {
            Desc = desc;
            Operations = operations;
        }
    }
}