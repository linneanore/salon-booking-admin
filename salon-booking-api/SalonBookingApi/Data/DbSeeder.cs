using SalonBookingApi.Models;

namespace SalonBookingApi.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Customers.Any()) return;

        db.Customers.AddRange(
            new Customer { Id = "c1", Name = "Maria Svensson", Phone = "070-123 45 67", Email = "maria@example.com", Notes = "Föredrar naturliga nyanser", Allergies = "" },
            new Customer { Id = "c2", Name = "Karl Andersson", Phone = "073-987 65 43", Email = "karl@example.com", Notes = "", Allergies = "PPD-allergi" },
            new Customer { Id = "c3", Name = "Lisa Pettersson", Phone = "076-555 12 34", Email = "lisa@example.com", Notes = "Stamkund sedan 2022", Allergies = "" },
            new Customer { Id = "c4", Name = "Johan Nilsson", Phone = "072-111 22 33", Email = "johan@example.com", Notes = "", Allergies = "" },
            new Customer { Id = "c5", Name = "Emma Gustavsson", Phone = "070-444 55 66", Email = "emma@example.com", Notes = "Vill alltid ha latte", Allergies = "Känslig hårbotten" }
        );

        db.Bookings.AddRange(
            new Booking { Id = "b1", CustomerId = "c1", StylistId = "s1", ServiceId = "sv1", StartTime = DateTime.Today.AddHours(9), EndTime = DateTime.Today.AddHours(10), Status = "confirmed", InternalNote = "" },
            new Booking { Id = "b2", CustomerId = "c2", StylistId = "s2", ServiceId = "sv2", StartTime = DateTime.Today.AddHours(10), EndTime = DateTime.Today.AddHours(11), Status = "pending", InternalNote = "Ny kund" },
            new Booking { Id = "b3", CustomerId = "c3", StylistId = "s1", ServiceId = "sv3", StartTime = DateTime.Today.AddHours(11), EndTime = DateTime.Today.AddHours(13), Status = "confirmed", InternalNote = "" }
        );

        db.SaveChanges();
    }
}