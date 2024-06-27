using Application.Tags;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        [HttpGet] //api/tags 
        public async Task<ActionResult<List<Tag>>> GetTags()
        {
            return await Mediator.Send(new TagList.Query());
        }
        [HttpGet("{id}")] //api/tags/tagtag
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            return await Mediator.Send(new TagDetails.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateTag(Tag tag)
        {
            await Mediator.Send(new CreateTag.Command { Tag = tag});

            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTag(int id, Tag tag)
        {
            tag.TagId = id;

            await Mediator.Send(new EditTag.Command { Tag = tag });

            return Ok();
        }
    }
}