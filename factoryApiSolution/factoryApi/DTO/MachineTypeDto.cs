using System.Collections.Generic;

namespace factoryApi.DTO
{
    public class MachineTypeDto
    {
        public long Id { get; set; }
        public string Desc { get; set; }

        public List<OperationDto> OperationList { get; set; }

        public string VisualizationModel { get; set; }

        public MachineTypeDto(long id, string desc, List<OperationDto> operationList, string visualizationModel)
        {
            Id = id;
            Desc = desc;
            OperationList = operationList;
            VisualizationModel = visualizationModel;
        }
    }
}