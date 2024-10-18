using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
        {
            try
            {
                var smtpClient = new SmtpClient(_config["Smtp:Host"])
                {
                    Port = int.Parse(_config["Smtp:Port"]),
                    Credentials = new NetworkCredential(_config["Smtp:Username"], _config["Smtp:Password"]),
                    EnableSsl = false 
                };

                var message = new MailMessage
                {
                    From = new MailAddress(_config["Smtp:From"], "Your Display Name"),
                    Subject = emailSubject,
                    Body = msg,
                    IsBodyHtml = true,
                };

                message.To.Add(new MailAddress(userEmail));

                await smtpClient.SendMailAsync(message);
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP Error: {smtpEx.Message}");
                Console.WriteLine($"Status Code: {smtpEx.StatusCode}");
                Console.WriteLine($"Inner Exception: {smtpEx.InnerException?.Message}");
                throw new Exception($"SMTP Error: {smtpEx.Message}", smtpEx);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                throw new Exception($"General Error: {ex.Message}", ex);
            }
        }
    }
}
