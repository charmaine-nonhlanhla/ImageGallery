using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Images
{
    public class EditImage
    {
        public class Command : IRequest
        {
            public Image Image { get; set; }
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
                var image = await _context.Images.FindAsync(request.Image.ImageId);

                image.Name = request.Image.Name ?? image.Name;

                await _context.SaveChangesAsync();
            }
        }
    }
}