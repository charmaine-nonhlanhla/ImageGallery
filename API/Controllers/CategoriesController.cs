using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet] //api/categories 
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            return await Mediator.Send(new CategoryList.Query());
        }
        [HttpGet("{id}")] //api/categories/catcat
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            return await Mediator.Send(new CategoryDetails.Query{Id = id});
        }
    }
}