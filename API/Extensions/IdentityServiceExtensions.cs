using Domain.Models;
using Persistence;
namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)

        {
            services.AddIdentityCore<User>(opt => 
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<ImageGalleryContext>();

            services.AddAuthentication();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}