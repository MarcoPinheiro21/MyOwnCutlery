using System;
using factoryApi.Models.Operation;
using Xunit;

namespace factoryApiTest.Models
{
    public class OperationTest
    {
        [Fact]
        void EnsureCompleteConstructorOperation()
        {
            var opTypeDesc = "op1";
            var tool = new Tool(1, "Drill");
            var operationType = new OperationType(opTypeDesc);
            var operation = new Operation(operationType, tool);
            Assert.NotNull(operation);
            Assert.Equal(opTypeDesc, operation.OperationType.OperationTypeName);
            Assert.Equal(tool, operation.Tool);
        }
            
        [Fact]
        void ConstructorWithNulls_ShouldThrowArgNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new Operation(null, null));
        }
    }
}