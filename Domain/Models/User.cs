using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Bio { get; set; }
        public ICollection<Comment> Comments { get; set;} = new List<Comment> ();
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
    }
}