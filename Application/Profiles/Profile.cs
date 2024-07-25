using Domain.Models;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set;}
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public ICollection<Photo> Photos { get; set; }

    }
}