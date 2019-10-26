using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace factoryApi.Models.Operation
{
    public class OperationType : Entity
    {
        public string OperationTypeName { get; set; }

        public OperationType(string operationTypeName)
        {
            OperationTypeName = operationTypeName;
        }
    }
}