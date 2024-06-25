using Domain.Models;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;


namespace Application.Images
{
    public class ImageList 
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