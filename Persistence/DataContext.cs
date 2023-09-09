using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    internal class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> MyProperty { get; set; }
    }
}
