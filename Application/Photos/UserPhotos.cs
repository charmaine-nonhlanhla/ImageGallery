using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class UserPhotos
    {
        public class Query : IRequest<Result<PagedList<Photo>>>
        {
            public string Username { get; set; }
            public PagingParams Params { get; set; } 
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Photo>>>
        {
            private readonly ImageGalleryContext _context;

            public Handler(ImageGalleryContext context)
            {
                _context = context;
            }

            public async Task<Result<PagedList<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null) return null; // Or handle user not found

                // Apply pagination
                var query = user.Photos.AsQueryable()
                    .OrderBy(d => d.UploadDate); // You can adjust the order as needed

                var pagedList = await PagedList<Photo>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return Result<PagedList<Photo>>.Success(pagedList);
            }
        }
    }
}
