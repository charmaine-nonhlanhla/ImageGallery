using AutoMapper;
using Domain.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
       public MappingProfiles()
       {
            CreateMap<User, Profiles.Profile>().ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
       }
    }
}