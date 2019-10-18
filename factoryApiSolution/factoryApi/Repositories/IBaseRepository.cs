using System.Collections.Generic;
using factoryApi.DTO;

namespace factoryApi.Repositories
{
    public interface IBaseRepository<CreateDto, Dto, Entity>
    {
        Dto GetById(long id);
        
        IEnumerable<Dto> GetAll();
        
        Entity Add(CreateDto writeDto);

        Dto UpdateElement(long id, CreateDto Dto);
        
        Dto DeleteElement(long id);
        
    }
}