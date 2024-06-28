using Application.Categories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPost]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            await Mediator.Send(new CreateCategory.Command { Category = category});

            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(int id, Category category)
        {
            category.CategoryId = id;

            await Mediator.Send(new EditCategory.Command { Category = category });

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await Mediator.Send(new DeleteCategory.Command { Id = id});

            return Ok();
        }
    }
}