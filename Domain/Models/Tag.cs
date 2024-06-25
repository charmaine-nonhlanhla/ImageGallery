namespace Domain.Models
{
    public class Tag
    {
        public int TagId { get; set; }
        public string Name { get; set; }
        public ICollection<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
    }
}