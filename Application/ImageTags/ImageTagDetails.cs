using Domain.Models;
using MediatR;
using Persistence;

namespace Application.ImageTags
{
    public class ImageTagDetails
    {
       public class Query : IRequest<ImageTag>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ImageTag>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<ImageTag> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ImageTags.FindAsync(request.Id);
            }
        } 
    }
}