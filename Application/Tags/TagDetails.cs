using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class TagDetails
    {
        public class Query : IRequest<Tag>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Tag>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<Tag> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tags.FindAsync(request.Id);
            }
        }
    }
}