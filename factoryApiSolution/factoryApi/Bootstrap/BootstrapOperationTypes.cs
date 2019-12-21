using factoryApi.Context;
using factoryApi.Models.Operation;
using factoryApi.Repositories;

namespace factoryApi.Bootstrap
{
    public class BootstrapOperationTypes
    {
        private readonly OperationRepository _operationRepository;

        private const string Op1Desc = "opt1";
        private const string Op2Desc = "opt2";
        private const string Op3Desc = "opt3";
        private const string Op4Desc = "opt4";
        private const string Op5Desc = "opt5";
        private const string Op6Desc = "opt6";
        private const string Op7Desc = "opt7";
        private const string Op8Desc = "opt8";

        public BootstrapOperationTypes(MasterFactoryContext context)
        {
            _operationRepository = new OperationRepository(context);
        }
        public void Execute()
        {
            var op1 = _operationRepository.GetOperationTypeByName(Op1Desc);
            if (op1 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op1Desc,36,11));
            }
            
            var op2 = _operationRepository.GetOperationTypeByName(Op2Desc);
            if (op2 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op2Desc, 40,10));
            }
            
            var op3 = _operationRepository.GetOperationTypeByName(Op3Desc);
            if (op3 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op3Desc, 34, 13));
            }
            
            var op4 = _operationRepository.GetOperationTypeByName(Op4Desc);
            if (op4 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op4Desc, 27, 8));
            }
            
            var op5 = _operationRepository.GetOperationTypeByName(Op5Desc);
            if (op5 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op5Desc, 60, 5));
            }
            
            var op6 = _operationRepository.GetOperationTypeByName(Op6Desc);
            if (op6 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op6Desc, 30, 6));
            }
            
            var op7 = _operationRepository.GetOperationTypeByName(Op7Desc);
            if (op7 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op7Desc, 40, 8));
            }
            
            var op8 = _operationRepository.GetOperationTypeByName(Op8Desc);
            if (op8 == null)
            {
                _operationRepository.AddOperationType(new OperationType(
                    Op8Desc, 42, 9));
            }

        }
        
        
    }
}