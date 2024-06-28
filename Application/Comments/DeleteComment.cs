using MediatR;
using Persistence;

namespace Application.Comments
{
    public class DeleteComment
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
                var comment = await _context.Comments.FindAsync(request.Id);

                _context.Remove(comment);

                await _context.SaveChangesAsync();
            }
        }
    }
}