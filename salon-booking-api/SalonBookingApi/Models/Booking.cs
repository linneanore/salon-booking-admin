using System.ComponentModel.DataAnnotations;

namespace SalonBookingApi.Models;

public class Booking
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string CustomerId { get; set; } = string.Empty;

    [Required]
    public string StylistId { get; set; } = string.Empty;

    [Required]
    public string ServiceId { get; set; } = string.Empty;

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    [Required]
    [RegularExpression("^(pending|confirmed|completed|cancelled|noshow)$")]
    public string Status { get; set; } = "pending";

    [MaxLength(500)]
    public string InternalNote { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}