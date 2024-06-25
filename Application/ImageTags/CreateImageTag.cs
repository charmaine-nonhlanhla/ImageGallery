using Domain.Models;
using MediatR;
using Persistence;

namespace Application.ImageTags
{
    public class CreateImageTag
    {
        public class Command : IRequest
        {
            public ImageTag ImageTag { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.ImageTags.Add(request.ImageTag);

                await _context.SaveChangesAsync();
            }
        }
    }
}