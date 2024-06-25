using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class CommentDetails
    {
          public class Query : IRequest<Comment>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Comment>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<Comment> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Comments.FindAsync(request.Id);
            }
        }
    }
}