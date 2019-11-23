using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using factoryApi.DTO;
using factoryApi.Models.Relationships;

namespace factoryApi.Models.Machine
{
    public class MachineType : Entity
    {
        public string Desc { get; set; }
        [ForeignKey("OperationId")] 
        public virtual ICollection<OperationMachineType> OperationMachineType { get; set; }

        public string VisualizationModel { get; set; }

        public MachineType(string desc)
        {
            VisualizationModel = "Robotic Arm";
            if (null == desc || desc.Trim().Length == 0)
            {
                throw new ArgumentNullException("Invalid machine type description.");
            }

            Desc = desc;
            OperationMachineType = new List<OperationMachineType>();
        }

        public MachineTypeDto toDto()
        {
            return new MachineTypeDto(Id, Desc, GetOperationIdsList(),VisualizationModel);
        }

        private List<OperationDto> GetOperationIdsList()
        {
            var operationDtoList = new List<OperationDto>();
            foreach (var op in OperationMachineType)
            {
                operationDtoList.Add(op.Operation.toDto());
            }

            return operationDtoList;
        }
    }
}