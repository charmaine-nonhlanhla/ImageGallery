using MediatR;
using Persistence;

namespace Application.ImageTags
{
    public class DeleteImageTag
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
                var imagetag = await _context.ImageTags.FindAsync(request.Id);

                _context.Remove(imagetag);

                await _context.SaveChangesAsync();
            }
        }
    }
}