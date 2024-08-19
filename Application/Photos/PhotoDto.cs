namespace Application.Photos
{
    public class PhotoDto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PhotoDescription { get; set; }
        public string PhotoTitle { get; set; }
        public string Username { get; set; } 
    }
}