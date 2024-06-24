using Domain.Models;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ImageGalleryContext context)
        {
            await context.SaveChangesAsync();
        }
    }
}