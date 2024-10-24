using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ImageGalleryContext context, UserManager<User> userManager)
        {
            if (context.Photos.Any()) return;

            var users = new List<User>
            {
                new User{FullName = "Bob", UserName = "bob", Email = "bob@test.com"},
                new User{FullName = "Tom", UserName = "tom", Email = "tom@test.com"},
                new User{FullName = "Jane", UserName = "jane", Email = "jane@test.com"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            var categories = new List<Category>
            {
                new Category
                {
                    CategoryName = "Nature"
                },
                new Category
                {
                    CategoryName = "Urban"
                },
                new Category
                {
                    CategoryName = "Abstract"
                }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();

            var photos = new List<Photo>
            {
                new Photo
                {
                    PhotoTitle = "Vacation",
                    Url = "https://www.example.com/image1.jpg",
                    PhotoDescription = "Lemon Meringue Pie",
                    CategoryId = categories[0].CategoryId,
                    IsMain = true,
                    Comments = new List<Comment>()
                },
                new Photo
                {
                    PhotoTitle = "Vacation 2",
                    Url = "https://www.example.com/image2.jpg",
                    PhotoDescription = "Lemon Meringue Pie",
                    CategoryId = categories[1].CategoryId,
                    IsMain = true,
                    Comments = new List<Comment>()
                },
                new Photo
                {
                    PhotoTitle = "Vacation 3",
                    Url = "https://www.example.com/image3.jpg",
                    PhotoDescription = "Lemon Meringue Pie",
                    CategoryId = categories[2].CategoryId,
                    IsMain = true,
                    Comments = new List<Comment>()
                }
            };
            await context.Photos.AddRangeAsync(photos);
            await context.SaveChangesAsync();

            var comments = new List<Comment>
            {
                new Comment
                {
                    Photo = photos[0],
                    Author = users[1],
                    CommentText = "Great picture!",
                },
                new Comment
                {
                    Photo = photos[1],
                    Author = users[2],
                    CommentText = "Amazing shot!",
                },
                new Comment
                {
                    Photo = photos[2],
                    Author = users[0],
                    CommentText = "Beautiful scenery!",
                }
            };
            await context.Comments.AddRangeAsync(comments);
            await context.SaveChangesAsync();

            photos[0].Comments.Add(comments[0]);
            photos[1].Comments.Add(comments[1]);
            photos[2].Comments.Add(comments[2]);
            await context.SaveChangesAsync();
        }
    }
}
