using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class UserPhotos
    {
        public class Query : IRequest<Result<List<PhotoDto>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PhotoDto>>>
        {
            private readonly ImageGalleryContext _context;
            private readonly IMapper _mapper;

            public Handler(ImageGalleryContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<PhotoDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photos = await _context.Photos
                    .Where(p => false)
                    .ProjectTo<PhotoDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<PhotoDto>>.Success(photos);
            }
        }
    }
}
