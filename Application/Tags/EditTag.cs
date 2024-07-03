using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class EditTag
    {
        public class Command : IRequest
        {
            public Tag Tag { get; set; }
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
                var tag = await _context.Tags.FindAsync(request.Tag.TagId);

                tag.TagName = request.Tag.TagName ?? tag.TagName;

                await _context.SaveChangesAsync();
            }
        }
    }
}