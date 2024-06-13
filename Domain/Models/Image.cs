namespace Domain.Models
{
    public class Image
    {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public DateTime UploadDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }  
    }
}