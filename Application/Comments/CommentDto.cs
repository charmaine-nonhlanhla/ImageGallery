namespace Application.Comments
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CommentText { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Image { get; set; }
        
    }
}