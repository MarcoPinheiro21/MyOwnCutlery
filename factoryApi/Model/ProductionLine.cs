using System.Collections.Generic;

namespace factoryApi.Model
{
    public class ProductionLine
    {
        private long Id { get; set; }
        private string Name { get; set; }
        private List<Machine> Machines { get; set; }

        public ProductionLine(string name, List<Machine> machines)
        {
            Name = name;
            Machines = machines;
        }
    }
}