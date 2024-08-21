using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AllPhotos
    {
        public class Query : IRequest<Result<PagedList<Photo>>> 
        {
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
                
                var query = _context.Photos
                .OrderBy(d => d.UploadDate)
                .AsQueryable();
                
                return Result<PagedList<Photo>>.Success(
                    await PagedList<Photo>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}
