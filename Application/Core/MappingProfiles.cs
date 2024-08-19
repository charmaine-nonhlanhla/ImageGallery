using Application.Comments;
using Application.Photos;
using AutoMapper;
using Domain.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
       public MappingProfiles()
       {
            string currentUsername = null;
            CreateMap<User, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))          
            .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Follower.UserName == currentUsername)));          
            CreateMap<Comment, CommentDto>()
            .ForMember(f => f.FullName, o => o.MapFrom(u => u.Author.FullName))
            .ForMember(f => f.UserName, o => o.MapFrom(u => u.Author.UserName))
            .ForMember(f => f.Image, o => o.MapFrom(u => u.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>()
            .ForMember(d => d.Username, o => o.MapFrom(p => p.User.UserName));
       }
    }
}