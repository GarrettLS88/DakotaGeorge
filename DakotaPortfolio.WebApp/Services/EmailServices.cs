using DakotaPortfolio.WebApp.Abstract;
using DakotaPortfolio.WebApp.Concrete;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DakotaPortfolio.WebApp.Services
{
    public class EmailServices : IEmailServices
    {
        private readonly SmtpClient _client;
        private readonly IConfiguration _configuration;

        public EmailServices(SmtpClient client, IConfiguration configuration)
        {
            _client = client;
            _configuration = configuration;
        }

        public void Send(Email email)
        {
            try
            {
                MailMessage message = new MailMessage(email.From, string.Join(";", email.To))
                {
                    IsBodyHtml = email.IsBodyHTML,
                    Sender = new MailAddress(email.From),
                    Subject = email.Subject,
                    Priority = MailPriority.Normal,
                    Body = email.Body
                };

                _client.Send(message);
            }
            catch (Exception ex)
            {
                Error(ex);
            }
        }

        public void Error(Exception excep)
        {
            string body = string.Format(@"
                <b>Message</b>: {0}<br/><br/>
                <b>Source</b>: {1}<br/><br/>
                <b>Target Site</b>: {2}<br/><br/>
                <b>Inner Exception</b>: {3}<br/><br/>
                <b>Stack Trace</b>: {4}",
                excep.Message, excep.Source, excep.TargetSite, excep.InnerException, excep.StackTrace);

            MailMessage message = new MailMessage(_configuration["EmailService:Error:From"], _configuration["EmailService:Error:To"])
            {
                IsBodyHtml = true,
                Sender = new MailAddress(_configuration["EmailService:Error:From"]),
                Subject = $"{_configuration["Website:Name"]} - {excep.Message}",
                Priority = MailPriority.High,
                Body = body
            };

            try
            {
                _client.Send(message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
