using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ImageTagsController : BaseApiController
    {
        private readonly ImageGalleryContext _context;
        public ImageTagsController(ImageGalleryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ImageTag>>> GetImageTags()
        {
            return await _context.ImageTags.ToListAsync();
        }
        [HttpGet("{id}")] //api/imagetags/itagitag
        public async Task<ActionResult<ImageTag>> GetImageTag(int id)
        {
            return await _context.ImageTags.FindAsync(id);
        }
    }
}