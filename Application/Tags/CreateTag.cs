using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class CreateTag
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
                _context.Tags.Add(request.Tag);

                await _context.SaveChangesAsync();
            }
        } 
    }
}