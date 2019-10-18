using System.Collections.Generic;
using factoryApi.Models.Machine;

namespace factoryApi.DTO
{
    public class ProductionLineDto
    {
        public long ProdutctLineId { get; set; }
        public string ProdutctLineName { get; set; }
        public ICollection<Machine> MachinesList { get; set; }
    }
}