using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
    public class List
    {
        public class Query : IRequest<List<Image>> {}

        public class Handler : IRequestHandler<Query, List<Image>>
        {
        private readonly ImageGalleryContext _context;
            
            public Handler(ImageGalleryContext context)
            {
            _context = context;                
            }
            
            public async Task<List<Image>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Images.ToListAsync();
            }
        }
    }
}