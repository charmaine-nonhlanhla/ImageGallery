using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public User Author { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Photo Photo { get; set; }  
        
    }
}