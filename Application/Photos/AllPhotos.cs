using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AllPhotos
    {
        public class Query : IRequest<Result<List<Photo>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Photo>>>
        {
            private readonly ImageGalleryContext _context;

            public Handler(ImageGalleryContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photos = await _context.Photos.ToListAsync();
                return Result<List<Photo>>.Success(photos);
            }
        }
    }
}
