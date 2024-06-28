using MediatR;
using Persistence;

namespace Application.Images
{
    public class DeleteImage
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var image = await _context.Images.FindAsync(request.Id);

                _context.Remove(image);

                await _context.SaveChangesAsync();
            }
        }
    }
}