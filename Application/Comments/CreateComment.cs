using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest
        {
            public Comment Comment { get; set; }
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
                _context.Comments.Add(request.Comment);

                await _context.SaveChangesAsync();
            }
        }
    }
}