using Application.Categories;
using Application.Comments;
using Application.Core;
using Application.Images;
using Application.ImageTags;
using Application.Tags;
using Application.Users;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<ImageGalleryContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ImageList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CategoryList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CommentList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ImageTagList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(TagList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UserList.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);   

            return services;
        }
    }
}