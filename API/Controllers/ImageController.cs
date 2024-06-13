using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ImageController
    {
        private readonly ImageGalleryContext _context;
        public ImageController(ImageGalleryContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }
        [HttpGet("{id}")] //api/images/imgimg
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await _context.Images.FindAsync(id);
        }
    }
}