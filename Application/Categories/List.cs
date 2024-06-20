using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<List<Category>> {}

        public class Handler : IRequestHandler<Query, List<Category>>
        {
        private readonly ImageGalleryContext _context;
            
            public Handler(ImageGalleryContext context)
            {
            _context = context;                
            }

            public async Task<List<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Categories.ToListAsync();
            }
        }
    }
}