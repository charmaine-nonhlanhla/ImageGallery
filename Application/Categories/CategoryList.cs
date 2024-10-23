using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class CategoryList
    {
        public class Query : IRequest<Result<List<Category>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Category>>>
        {
            private readonly ImageGalleryContext _context;
            public Handler(ImageGalleryContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Category>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Category>>.Success(await _context.Categories.ToListAsync());
            }
        }
    }
}