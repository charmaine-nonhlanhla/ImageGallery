using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
    }
}