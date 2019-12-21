using factoryApi.Context;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Bootstrap
{
    public class BootstrapTools
    {
        private readonly OperationRepository _operationRepository;

        public BootstrapTools(MasterFactoryContext context)
        {
            _operationRepository = new OperationRepository(context);
        }
        public void Execute()
        {
            var fa = _operationRepository.GetToolById(1);
            if (fa == null)
            {
                _operationRepository.addTool(new Tool(1, 
                    "fa"));
            }
            
            var fb = _operationRepository.GetToolById(2);
            if (fb == null)
            {
                _operationRepository.addTool(new Tool(2, 
                    "fb"));
            }
            
            var fc = _operationRepository.GetToolById(3);
            if (fc == null)
            {
                _operationRepository.addTool(new Tool(3, 
                    "fc"));
            }
            
            var fd = _operationRepository.GetToolById(4);
            if (fd == null)
            {
                _operationRepository.addTool(new Tool(4, 
                    "fd"));
            }
            
            var fe = _operationRepository.GetToolById(5);
            if (fe == null)
            {
                _operationRepository.addTool(new Tool(5, 
                    "fe"));
            }
            
            var ff = _operationRepository.GetToolById(6);
            if (ff == null)
            {
                _operationRepository.addTool(new Tool(6, 
                    "ff"));
            }
            
        }
        
        
    }
}