using Application.Categories;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CategoriesController : BaseApiController
    {

        [HttpGet] //api/categories
        public async Task<IActionResult> GetCategories()
        {
            return HandleResult(await Mediator.Send(new CategoryList.Query()));
        }

        [HttpGet("{id}")] //api/categories/catcat
        public async Task<IActionResult> GetCategory(int id)
        {
         return HandleResult(await Mediator.Send(new CategoryDetails.Query{Id = id}));
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

           return HandleResult(await Mediator.Send(new EditCategory.Command { Category = category }));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteCategory.Command { Id = id}));
        }
    }
}