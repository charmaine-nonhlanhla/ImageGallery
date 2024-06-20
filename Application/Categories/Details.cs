using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class Details
    {
        public class Query : IRequest<Category>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Category>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<Category> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Categories.FindAsync(request.Id);
            }
        }
    }
}