using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        [HttpGet] //api/tags 
        public async Task<ActionResult<List<Image>>> GetTags()
        {
            return await Mediator.Send(new TagList.Query());
        }
        [HttpGet("{id}")] //api/tags/tagtag
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            return await Mediator.Send(new TagDetails.Query{Id = id});
        }
    }
}