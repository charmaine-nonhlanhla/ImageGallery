using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class UserDetails
    {
        public class Query : IRequest<User>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Users.FindAsync(request.Id);
            }
        }
    }
}