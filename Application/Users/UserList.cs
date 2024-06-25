using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Users
{
    public class UserList
    {
        public class Query : IRequest<List<User>> {}

        public class Handler : IRequestHandler<Query, List<User>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
                
            }
            public async Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Users.ToListAsync();
            }
        }
    }
}