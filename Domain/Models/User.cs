using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsEmailVerified { get; set; }
        public ICollection<Comment> Comments { get; set;} = new List<Comment> ();
        public ICollection<Image> Images { get; set; } = new List<Image>();
        
    }
}