using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class EditCategory
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
                var category = await _context.Categories.FindAsync(request.Category.CategoryId);

                category.Name = request.Category.Name ?? category.Name;

                await _context.SaveChangesAsync();
            }
        }
    }
}