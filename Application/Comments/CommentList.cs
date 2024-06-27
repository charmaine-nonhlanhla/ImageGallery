using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CommentList
    {
        public class Query : IRequest<List<Comment>> {}

        public class Handler : IRequestHandler<Query, List<Comment>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<List<Comment>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Comments.ToListAsync();
            }
        }
    }
}