using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ImageTagsController : BaseApiController
    {
        [HttpGet] //api/imagetags 
        public async Task<ActionResult<List<ImageTag>>> GetImageTags()
        {
            return await Mediator.Send(new ImageTagList.Query());
        }
        [HttpGet("{id}")] //api/images/itagitag
        public async Task<ActionResult<ImageTag>> GetImageTag(int id)
        {
            return await Mediator.Send(new ImageTagDetails.Query{Id = id});
        }
    }
}