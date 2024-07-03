namespace Domain.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string ImageTitle { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; }
        public string SecretEditCode { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
        
    }
}