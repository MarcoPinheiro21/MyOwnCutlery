using System.Collections;
using System.Collections.Generic;

namespace factoryApi.Models.ProductionLine
{
    public class ProductionLineFactory
    {
        public static ProductionLine Create(string name, List<Machine.Machine> machinesList)
        {
            return new ProductionLine(name, machinesList) { };
        }
    }
}