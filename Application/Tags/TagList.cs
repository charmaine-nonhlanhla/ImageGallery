using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class TagList
    {
        public class Query : IRequest<List<Tag>> {}

        public class Handler : IRequestHandler<Query, List<Tag>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }

            public async Task<List<Tag>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Tags.ToListAsync();
            }
        }
    }
}