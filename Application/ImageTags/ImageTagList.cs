using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ImageTags
{
    public class ImageTagList
    {
        public class Query : IRequest<List<ImageTag>> {}

        public class Handler : IRequestHandler<Query, List<ImageTag>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<List<ImageTag>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ImageTags.ToListAsync();
            }
        }
    }
}