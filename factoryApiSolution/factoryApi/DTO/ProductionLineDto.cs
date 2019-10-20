using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class ProductionLineDto
    {
        public long ProductionLineId { get; set; }
        public string ProductionLineName { get; set; }
        
        public List<MachineDto> MachinesListDtos { get; set; }

        public ProductionLineDto(long productionLineId, string productionLineName, List<MachineDto> machinesListDtos)
        {
            ProductionLineId = productionLineId;
            ProductionLineName = productionLineName;
            MachinesListDtos = machinesListDtos;
        }
    }
}