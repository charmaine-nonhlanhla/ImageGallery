namespace Domain.Models
{
    public class Category
    {
    public int CategoryId { get; set; }
    public string Name { get; set; }
    public ICollection<Image> Images { get; set; } 
    }
}