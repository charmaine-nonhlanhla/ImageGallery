using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class CreateUser
    {
        public class Command : IRequest
        {
            public User User { get; set; }
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
                _context.Users.Add(request.User);

                await _context.SaveChangesAsync();
            }
        }
    }
}