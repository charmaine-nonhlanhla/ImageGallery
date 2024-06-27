using Application.Comments;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        [HttpGet] //api/comments
        public async Task<ActionResult<List<Comment>>> GetComments()
        {
            return await Mediator.Send(new CommentList.Query());
        }

        [HttpGet("{id}")] //api/comments/comcom
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            return await Mediator.Send(new CommentDetails.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            await Mediator.Send(new CreateComment.Command { Comment = comment});

            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(int id, Comment comment)
        {
            comment.CommentId = id;

            await Mediator.Send(new EditComment.Command { Comment = comment });

            return Ok();
        }
    }
}