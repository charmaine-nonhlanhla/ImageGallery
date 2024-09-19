using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CommentList
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public string PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
        private readonly ImageGalleryContext _context;
        private readonly IMapper _mapper;
            public Handler(ImageGalleryContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;

            }
            
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                .Where(x => x.Photo.Id == request.PhotoId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}