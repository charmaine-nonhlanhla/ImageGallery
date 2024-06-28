using MediatR;
using Persistence;

namespace Application.Tags
{
    public class DeleteTag
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
                var tag = await _context.Tags.FindAsync(request.Id);

                _context.Remove(tag);

                await _context.SaveChangesAsync();
            }
        }
    }
}