using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ImageGalleryContext : IdentityDbContext<User>
    {
        public ImageGalleryContext(DbContextOptions<ImageGalleryContext> options)
            : base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Comment>()
                .HasOne(p => p.Photo)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

             modelBuilder.Entity<UserFollowing>(b => {
                b.HasKey(k => new { k.FollowerId, k.FollowedId });

                b.HasOne(o => o.Follower)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.FollowerId)
                    .OnDelete(DeleteBehavior.NoAction);

                b.HasOne(o => o.Followed)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.FollowedId)
                    .OnDelete(DeleteBehavior.NoAction);           
             });
        }
    }
}