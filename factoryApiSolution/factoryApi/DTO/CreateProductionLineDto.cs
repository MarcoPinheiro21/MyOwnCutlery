using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class CreateProductionLineDto
    {
        public string ProductionLineName { get; set; }

        public List<long> MachinesListIds { get; set; }
        
        public CreateProductionLineDto(string productionLineName, List<long> machinesListIds)
        {
            ProductionLineName = productionLineName;
            MachinesListIds = machinesListIds;
        }
    }
}