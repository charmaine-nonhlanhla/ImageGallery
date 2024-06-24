using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        private readonly ImageGalleryContext _context;
        public CommentsController(ImageGalleryContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }
        [HttpGet("{id}")] //api/comments/comcom
        public async Task<ActionResult<Category>> GetComment(int id)
        {
            return await _context.Comments.FindAsync(id);
        }
    }
}