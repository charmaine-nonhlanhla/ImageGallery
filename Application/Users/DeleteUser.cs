using MediatR;
using Persistence;

namespace Application.Users
{
    public class DeleteUser
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
                var user = await _context.Users.FindAsync(request.Id);

                _context.Remove(user);

                await _context.SaveChangesAsync();
            }
        }
    }
}