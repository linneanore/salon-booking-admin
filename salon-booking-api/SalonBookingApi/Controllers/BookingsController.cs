using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonBookingApi.Data;
using SalonBookingApi.Models;

namespace SalonBookingApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _db;

    public BookingsController(AppDbContext db)
    {
        _db = db;
    }

    // hämtar alla bokningar
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Booking>>> GetAll()
    {
        return await _db.Bookings.ToListAsync();
    }

    // GET api/bookings/
    [HttpGet("{id}")]
    public async Task<ActionResult<Booking>> GetById(string id)
    {
        var booking = await _db.Bookings.FindAsync(id);
        if (booking == null) return NotFound();
        return booking;
    }

    // skapar ny bokning
    [HttpPost]
    public async Task<ActionResult<Booking>> Create(Booking booking)
    {
        booking.Id = Guid.NewGuid().ToString();
        booking.CreatedAt = DateTime.UtcNow;
        booking.UpdatedAt = DateTime.UtcNow;
        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
    }

    // uppdaterar status eller anteckning
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Booking booking)
    {
        var existing = await _db.Bookings.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Status = booking.Status;
        existing.InternalNote = booking.InternalNote;
        existing.StartTime = booking.StartTime;
        existing.EndTime = booking.EndTime;
        existing.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE api/bookings
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var booking = await _db.Bookings.FindAsync(id);
        if (booking == null) return NotFound();

        _db.Bookings.Remove(booking);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}