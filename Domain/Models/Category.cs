namespace Domain.Models
{
    public class Category
    {
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public ICollection<Image> Images { get; set; } = new List<Image>();
    }
}