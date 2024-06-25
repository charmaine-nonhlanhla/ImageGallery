using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Images
{
    public class ImageDetails
    {
        public class Query : IRequest<Image>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Image>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<Image> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Images.FindAsync(request.Id);
            }
        }
    }
}