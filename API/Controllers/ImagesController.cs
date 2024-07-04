using Application.Images;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ImagesController : BaseApiController
    {

        [HttpGet] //api/images 
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            return await Mediator.Send(new ImageList.Query());
        }

        [HttpGet("{id}")] //api/images/imgimg
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await Mediator.Send(new ImageDetails.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateImage(Image image)
        {
            await Mediator.Send(new CreateImage.Command { Image = image});

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditImage(int id, Image image)
        {
            image.ImageId = id;

            await Mediator.Send(new EditImage.Command { Image = image });

            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            await Mediator.Send(new DeleteImage.Command { Id = id});

            return Ok();
        }
    }
}