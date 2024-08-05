namespace Domain.Models
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public int CategoryId { get; set; } // Foreign key property
        public Category Category { get; set; } // Navigation property

        public string PhotoDescription { get; set; }
        public string PhotoTitle { get; set; }
    }
}
