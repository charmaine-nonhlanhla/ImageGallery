using Application.Comments;
using AutoMapper;
using Domain.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Comment, CommentDto>()
            .ForMember(f => f.FullName, o => o.MapFrom(u => u.Author.FullName))
            .ForMember(f => f.Username, o => o.MapFrom(u => u.Author.UserName))
            .ForMember(f => f.Image, o => o.MapFrom(u => u.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}