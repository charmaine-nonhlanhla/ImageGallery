using Application.ImageTags;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPost]
        public async Task<IActionResult> CreateImageTag (ImageTag imagetag)
        {
            await Mediator.Send(new CreateImageTag.Command { ImageTag = imagetag});

            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditImageTag(int id, ImageTag imagetag)
        {
            imagetag.ImageId = id;

            await Mediator.Send(new EditImageTag.Command { ImageTag = imagetag });

            return Ok();
        }
    }
}