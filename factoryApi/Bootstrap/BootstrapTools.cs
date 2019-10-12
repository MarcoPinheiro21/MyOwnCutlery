using factoryApi.Context;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Bootstrap
{
    public class BootstrapTools
    {
        private readonly OperationRepository _operationRepository;
        private static string TOOL_MARTELO_DESC = "Martelo";
        private static long TOOL_MARTELO_ID = 1;
        
        private static string TOOL_BROCA_DESC = "Broca";
        private static long TOOL_BROCA_ID = 2;

        public BootstrapTools(MasterFactoryContext context)
        {
            _operationRepository = new OperationRepository(context);
        }
        public void Execute()
        {
            var martelo = _operationRepository.GetToolById(TOOL_MARTELO_ID);
            if (martelo == null)
            {
                _operationRepository.addTool(new Tool(TOOL_MARTELO_ID, 
                    TOOL_MARTELO_DESC));
            }
            
            var broca = _operationRepository.GetToolById(TOOL_BROCA_ID);
            if (broca == null)
            {
                _operationRepository.addTool(new Tool(TOOL_BROCA_ID, 
                    TOOL_BROCA_DESC));
            }
            
        }
        
        
    }
}