using System.Collections.Generic;
using factoryApi.DTO;

namespace factoryApi.Repositories
{
    public interface IBaseRepository<Dto, Entity>
    {
        Dto GetById(long id);
        
        IEnumerable<Dto> GetAll();
        
        Entity Add(Dto writeDto);

        Dto UpdateElement(int id, Entity Dto);
        
        Dto DeleteElement(int id);
        
    }
}