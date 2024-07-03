using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Comment> Comments { get; set;} = new List<Comment> ();
        public ICollection<Image> Images { get; set; } = new List<Image>();
        
    }
}