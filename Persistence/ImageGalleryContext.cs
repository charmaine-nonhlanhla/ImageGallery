using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ImageGalleryContext : DbContext
    {
        public ImageGalleryContext(DbContextOptions<ImageGalleryContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ImageTag> ImageTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        

            
            base.OnModelCreating(modelBuilder);

            
        }
    }
}
