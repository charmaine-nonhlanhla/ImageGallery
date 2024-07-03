using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(ImageGalleryContext context)
        {
            if (context.Images.Any()) return;

            // Seed Users
            var users = new List<User>
            {
                new User
                {
                    Username = "user1",
                    Email = "user1@example.com",
                    PasswordHash = "hashedpassword1",
                    CreatedAt = DateTime.Now,
                    IsEmailVerified = true
                },
                new User
                {
                    Username = "user2",
                    Email = "user2@example.com",
                    PasswordHash = "hashedpassword2",
                    CreatedAt = DateTime.Now,
                    IsEmailVerified = true
                },
                new User
                {
                    Username = "user3",
                    Email = "user3@example.com",
                    PasswordHash = "hashedpassword3",
                    CreatedAt = DateTime.Now,
                    IsEmailVerified = true
                }
            };
            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();

            // Seed Categories
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

            // Seed Tags
            var tags = new List<Tag>
            {
                new Tag
                {
                    TagName = "Summer"
                },
                new Tag
                {
                    TagName = "Vacation"
                },
                new Tag
                {
                    TagName = "Beach"
                }
            };
            await context.Tags.AddRangeAsync(tags);
            await context.SaveChangesAsync();

            // Seed Images
            var images = new List<Image>
            {
                new Image
                {
                    ImageTitle = "Vacation",
                    Url = "https://www.example.com/image1.jpg",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = users[0].UserId,
                    CategoryId = categories[0].CategoryId,
                    SecretEditCode = "secretcode1"
                },
                new Image
                {
                    ImageTitle = "Vacation 2",
                    Url = "https://www.example.com/image2.jpg",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = users[1].UserId,
                    CategoryId = categories[1].CategoryId,
                    SecretEditCode = "secretcode2"
                },
                new Image
                {
                    ImageTitle = "Vacation 3",
                    Url = "https://www.example.com/image3.jpg",
                    Description = "Lemon Meringue Pie",
                    UploadDate = DateTime.Now,
                    UserId = users[2].UserId,
                    CategoryId = categories[2].CategoryId,
                    SecretEditCode = "secretcode3"
                }
            };
            await context.Images.AddRangeAsync(images);
            await context.SaveChangesAsync();

            // Seed Comments
            var comments = new List<Comment>
            {
                new Comment
                {
                    ImageId = images[0].ImageId,
                    UserId = users[1].UserId,
                    CommentText = "Great picture!",
                    CommentDate = DateTime.Now
                },
                new Comment
                {
                    ImageId = images[1].ImageId,
                    UserId = users[2].UserId,
                    CommentText = "Amazing shot!",
                    CommentDate = DateTime.Now
                },
                new Comment
                {
                    ImageId = images[2].ImageId,
                    UserId = users[0].UserId,
                    CommentText = "Beautiful scenery!",
                    CommentDate = DateTime.Now
                }
            };
            await context.Comments.AddRangeAsync(comments);
            await context.SaveChangesAsync();

            // Seed ImageTags
            var imageTags = new List<ImageTag>
            {
                new ImageTag
                {
                    ImageId = images[0].ImageId,
                    TagId = tags[0].TagId
                },
                new ImageTag
                {
                    ImageId = images[0].ImageId,
                    TagId = tags[1].TagId
                },
                new ImageTag
                {
                    ImageId = images[1].ImageId,
                    TagId = tags[1].TagId
                },
                new ImageTag
                {
                    ImageId = images[1].ImageId,
                    TagId = tags[2].TagId
                },
                new ImageTag
                {
                    ImageId = images[2].ImageId,
                    TagId = tags[0].TagId
                },
                new ImageTag
                {
                    ImageId = images[2].ImageId,
                    TagId = tags[2].TagId
                }
            };
            await context.ImageTags.AddRangeAsync(imageTags);
            await context.SaveChangesAsync();
        }
    }
}
