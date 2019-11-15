using factoryApi.Context;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Bootstrap
{
    public class BootstrapOperationTypes
    {
        private readonly OperationRepository _operationRepository;

        private const string Op1Desc = "op1";
        private const string Op2Desc = "op2";
        private const string Op3Desc = "op3";

        public BootstrapOperationTypes(MasterFactoryContext context)
        {
            _operationRepository = new OperationRepository(context);
        }
        public void Execute()
        {
            var op1 = _operationRepository.GetOperationTypeByName(Op1Desc);
            if (op1 == null)
            {
                _operationRepository.AddOperationType(
                    new OperationType(Op1Desc,60,5));
            }
            
            var op2 = _operationRepository.GetOperationTypeByName(Op2Desc);
            if (op2 == null)
            {
                _operationRepository.AddOperationType(
                    new OperationType(Op2Desc, 30,6));
            }
            
            var op3 = _operationRepository.GetOperationTypeByName(Op3Desc);
            if (op3 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op3Desc, 40, 8));
            }

        }
        
        
    }
}