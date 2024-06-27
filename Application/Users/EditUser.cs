using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class EditUser
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
                var user = await _context.Users.FindAsync(request.User.UserId);

                user.Username = request.User.Username ?? user.Username;

                await _context.SaveChangesAsync();
            }
        }
    }
}