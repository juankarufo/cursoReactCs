using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

app.MapControllers();

app.UseAuthorization();

app.UseCors("MisNormas");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error ocurred during migration");
}

app.Run();
