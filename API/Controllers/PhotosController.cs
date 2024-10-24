using Application.Core;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new AllPhotos.Query { Params = param }));

        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserPhotos(string username, [FromQuery] PagingParams param)
        {
            var result = await Mediator.Send(new UserPhotos.Query { Username = username, Params = param });
            return HandlePagedResult(result);
        }
    }
}