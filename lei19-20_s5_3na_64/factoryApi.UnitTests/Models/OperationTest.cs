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
            string name = "op1";
            var tool = new Tool(1, "Drill");
            var operation = new Operation(name, tool);
            Assert.NotNull(operation);
            Assert.Equal(name, operation.OperationName);
            Assert.Equal(tool, operation.Tool);
        }
            
        [Fact]
        void ConstructorWithNulls_ShouldThrowArgNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new Operation(null, null));
        }
    }
}