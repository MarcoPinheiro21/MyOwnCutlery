using factoryApi.Context;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Bootstrap
{
    public class BootstrapTools
    {
        private readonly OperationRepository _operationRepository;
        private static string TOOL_HAMMER_DESC = "Hammer";
        private static long TOOL_HAMMER_ID = 1;
        
        private static string TOOL_DRILL_DESC = "Drill";
        private static long TOOL_DRILL_ID = 2;

        public BootstrapTools(MasterFactoryContext context)
        {
            _operationRepository = new OperationRepository(context);
        }
        public void Execute()
        {
            var hammer = _operationRepository.GetToolById(TOOL_HAMMER_ID);
            if (hammer == null)
            {
                _operationRepository.addTool(new Tool(TOOL_HAMMER_ID, 
                    TOOL_HAMMER_DESC));
            }
            
            var drill = _operationRepository.GetToolById(TOOL_DRILL_ID);
            if (drill == null)
            {
                _operationRepository.addTool(new Tool(TOOL_DRILL_ID, 
                    TOOL_DRILL_DESC));
            }
            
        }
        
        
    }
}