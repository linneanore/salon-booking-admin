using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonBookingApi.Data;
using SalonBookingApi.Models;

namespace SalonBookingApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _db;

    // Dependency Injection
    public CustomersController(AppDbContext db)
    {
        _db = db;
    }

    // hämtar alla kunder
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAll()
    {
        return await _db.Customers.ToListAsync();
    }

    // hämtar en specifik kund
    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetById(string id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null) return NotFound();
        return customer;
    }

    // skapar en ny kund
    [HttpPost]
    public async Task<ActionResult<Customer>> Create(Customer customer)
    {
        customer.Id = Guid.NewGuid().ToString();
        customer.CreatedAt = DateTime.UtcNow;
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
    }

    // uppdaterar en kund
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Customer customer)
    {
        var existing = await _db.Customers.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = customer.Name;
        existing.Phone = customer.Phone;
        existing.Email = customer.Email;
        existing.Notes = customer.Notes;
        existing.Allergies = customer.Allergies;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // tar bort en kund
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null) return NotFound();

        _db.Customers.Remove(customer);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}