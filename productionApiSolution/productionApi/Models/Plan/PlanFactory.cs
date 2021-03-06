﻿using System.Collections.Generic;
using productionApi.DTO;

namespace productionApi.Models.Plan
{
    public class PlanFactory
    {
        
        public static Plan Create(ICollection<CreateOperationDto> OperationDtos)
        {
            List<Operation> operations= new List<Operation>();
            foreach (var VARIABLE in OperationDtos)
            {
                operations.Add(OperationFactory.Create(VARIABLE.OperationId,VARIABLE.Tool,VARIABLE.Type,VARIABLE.ExecutionTime,VARIABLE.SetupTime, VARIABLE.Order));
            }
            return new Plan(operations);
        }
    }
}