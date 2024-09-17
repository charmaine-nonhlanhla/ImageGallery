using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public int CategoryId { get; set; } 
        public Category Category { get; set; } 
        public string PhotoDescription { get; set; }
        public string PhotoTitle { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public string UserId { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
