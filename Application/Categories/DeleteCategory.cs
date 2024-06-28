using MediatR;
using Persistence;

namespace Application.Categories
{
    public class DeleteCategory
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
                var category = await _context.Categories.FindAsync(request.Id);

                _context.Remove(category);

                await _context.SaveChangesAsync();
            }
        }
    }
}