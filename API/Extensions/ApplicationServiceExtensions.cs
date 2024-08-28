using Application.Categories;
using Application.Comments;
using Application.Core;
using Application.Interfaces;
using Application.Users;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
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
                policy
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000", "https://localhost:3000");
                });
            });

          
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CategoryList.Handler).Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UserList.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); 
            services.AddHttpContextAccessor(); 
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>(); 
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<CreateCategory>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();


            
            return services;
        }
    }
}