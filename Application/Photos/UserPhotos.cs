using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class UserPhotos
    {
        public class Query : IRequest<Result<List<Photo>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Photo>>>
        {
            private readonly ImageGalleryContext _context;

            public Handler(ImageGalleryContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null) return null; // Or handle user not found

                return Result<List<Photo>>.Success(user.Photos.ToList());
            }
        }
    }
}