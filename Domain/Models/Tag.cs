namespace Domain.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ImageTag> ImageTags { get; set; }
    }
}