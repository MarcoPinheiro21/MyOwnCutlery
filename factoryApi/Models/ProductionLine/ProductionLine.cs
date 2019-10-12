using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using factoryApi.DTO;

namespace factoryApi.Models.ProductionLine
{
    public class ProductionLine
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long ProdutctLineId { get; set; }

        public string ProdutctLineName { get; set; }
        public ICollection<Machine.Machine> MachinesList { get; set; }

        public ProductionLine()
        {
        }

        public ProductionLine(string name, ICollection<Machine.Machine> machinesList)
        {
            ProdutctLineName = name;
            MachinesList = machinesList;
        }

        public ProductionLineDto toDto()
        {
            ProductionLineDto productionLineDto = new ProductionLineDto();
            productionLineDto.ProdutctLineId = ProdutctLineId;
            productionLineDto.ProdutctLineName = ProdutctLineName;
            productionLineDto.MachinesList = MachinesList;
            return productionLineDto;
        }
    }
}