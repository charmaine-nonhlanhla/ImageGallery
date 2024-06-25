using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class CreateCategory
    {
        public class Command : IRequest
        {
            public Category Category { get; set; }
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
                _context.Categories.Add(request.Category);

                await _context.SaveChangesAsync();
            }
        }
    }
}