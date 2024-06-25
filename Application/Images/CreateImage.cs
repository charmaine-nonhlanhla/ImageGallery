using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Images
{
    public class CreateImage
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
                _context.Images.Add(request.Image);

                await _context.SaveChangesAsync();
            }
        }
    }
}