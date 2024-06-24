namespace Domain.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string CommentText { get; set; }
        public DateTime CommentDate { get; set; }
    }
}