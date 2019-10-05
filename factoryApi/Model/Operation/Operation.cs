namespace factoryApi.Model.Operation
{
    public class Operation
         {
             public long Id { get; set; }
             public Tool Tool { get; set; }
             public OperationType OperationType { get; set; }
     
//             public Operation(Tool tool, OperationType operationType)
//             {
//                 Tool = tool;
//                 OperationType = operationType;
//             }
         }
}