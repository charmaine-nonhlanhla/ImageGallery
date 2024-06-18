using Domain.Models;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ImageGalleryContext context)
        {
            if (context.Images.Any()) return;

            var images = new List<Image>
            {
                new Image
                {
                    Name = "Vacation",
                    Url = "https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fpixlr.com%2Fimages%2Findex%2Fai-image-generator-one.webp&imgrefurl=https%3A%2F%2Fpixlr.com%2F&docid=5o-TWu8oxtNdLM&tbnid=ITvWGUbYNP6EBM&vet=12ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA..i&w=435&h=600&hcb=2&ved=2ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = 1,
                    CategoryId = 1,
                },
                new Image
                {
                    Name = "Vacation 2",
                    Url = "https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fpixlr.com%2Fimages%2Findex%2Fai-image-generator-one.webp&imgrefurl=https%3A%2F%2Fpixlr.com%2F&docid=5o-TWu8oxtNdLM&tbnid=ITvWGUbYNP6EBM&vet=12ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA..i&w=435&h=600&hcb=2&ved=2ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = 2,
                    CategoryId = 2,
                },
                new Image
                {
                    Name = "Vacation 3",
                    Url = "https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fpixlr.com%2Fimages%2Findex%2Fai-image-generator-one.webp&imgrefurl=https%3A%2F%2Fpixlr.com%2F&docid=5o-TWu8oxtNdLM&tbnid=ITvWGUbYNP6EBM&vet=12ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA..i&w=435&h=600&hcb=2&ved=2ahUKEwjiyofN6eSGAxWphf0HHbtWCwMQM3oECFUQAA",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = 3,
                    CategoryId = 3,
                }
            };

            await context.Images.AddRangeAsync(images);
            await context.SaveChangesAsync();
        }
    }
}