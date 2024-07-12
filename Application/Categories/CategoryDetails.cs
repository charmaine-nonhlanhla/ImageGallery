using Application.Core;
using Domain.Models;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class CategoryDetails
    {
        public class Query : IRequest<Result<Category>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Category>>
        {
        private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
            _context = context;
           
            }
            public async Task<Result<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Id);

                return Result<Category>.Success(category);
            }
        }
    }
}