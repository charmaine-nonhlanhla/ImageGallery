using Application.Images;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImagesController : BaseApiController
    {

        [HttpGet] //api/images 
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] //api/images/imgimg
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
    }
}