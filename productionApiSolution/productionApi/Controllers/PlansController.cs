using System.Collections.Generic;
using factoryApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using productionApi.Context;
using productionApi.DTO;
using productionApi.Repositories;
using productionApi.Services;

[Route("productionApi/plans/")]
[ApiController]
public class PlansController : ControllerBase
{
    private readonly PlanService _service;

    public PlansController(MasterProductionContext context)
    {
        _service = new PlanService(new PlanRepository(context));
        //Charges all the tools needed.
        //BootstrapTools bootstrapTools = new BootstrapTools(context);
        //bootstrapTools.Execute();
    }

    // GET productionApi/plans/5
    [HttpGet("{id}")]
    [ProducesResponseType(200, Type = typeof(PlanDto))]
    [ProducesResponseType(404)]
    public ActionResult GetById(int id)
    {
        try
        {
            return Ok(_service.FindById(id));
        }
        catch (ObjectNotFoundException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: productionApi/plans
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<PlanDto>))]
    public ActionResult GetPlans()
    {
        return Ok(_service.FindAll());
    }

    // POST: productionApi/plans
    [HttpPost]
    [ProducesResponseType(200, Type = typeof(PlanDto))]
    [ProducesResponseType(404)]
    public ActionResult<PlanDto> PostPlan(CreatePlanDto planDto)
    {
        try
        {
            return Ok(_service.Add(planDto));
        }
        catch (ObjectNotFoundException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT productionApi/plans/5
    [HttpPut("{id}")]
    [ProducesResponseType(200, Type = typeof(PlanDto))]
    [ProducesResponseType(404)]
    public ActionResult Update(long id, [FromBody] CreatePlanDto planDto)
    {
        try
        {
            return Ok(_service.Update(id, planDto));
        }
        catch (ObjectNotFoundException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE productionApi/plans/5
    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(PlanDto))]
    [ProducesResponseType(404)]
    public ActionResult Delete(long id)
    {
        try
        {
            return Ok(_service.Delete(id));
        }
        catch (ObjectNotFoundException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}