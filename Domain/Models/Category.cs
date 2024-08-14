namespace Domain.Models
{
    public class Category
    {
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}  