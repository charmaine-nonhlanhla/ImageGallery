namespace Domain.Models
{
    public class ImageTag
    {
        public int ImageTagId { get; set; }
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}