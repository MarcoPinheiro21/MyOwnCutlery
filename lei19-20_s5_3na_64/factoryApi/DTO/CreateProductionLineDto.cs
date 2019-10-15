using System.Collections.Generic;
using factoryApi.Models.Machine;

namespace factoryApi.DTO
{
    public class CreateProductionLineDto
    {
        public string ProductionLineName { get; set; }

        public List<long> MachinesListIds { get; set; }
    }
}