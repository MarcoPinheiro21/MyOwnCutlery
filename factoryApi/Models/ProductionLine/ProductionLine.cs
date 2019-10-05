using System.Collections.Generic;

namespace factoryApi.Models.ProductionLine
{
    public class ProductionLine
    {
        public ProductionLine(string name, ICollection<Machine.Machine> machines)
        {
            Name = name;
            Machines = machines;
        }

        private long Id { get; set; }
        private string Name { get; }
        private ICollection<Machine.Machine> Machines { get; }
    }
}