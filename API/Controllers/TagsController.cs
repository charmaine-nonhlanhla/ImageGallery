using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        private readonly ImageGalleryContext _context;
        public TagsController(ImageGalleryContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public async Task<ActionResult<List<Tag>>> GetTags()
        {
            return await _context.Tags.ToListAsync();
        }
        [HttpGet("{id}")] //api/tags/tagtag
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            return await _context.Tags.FindAsync(id);
        }
    }
}