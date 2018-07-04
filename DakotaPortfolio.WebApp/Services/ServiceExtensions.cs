using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Mail;

namespace PortfolioGS.WebApp.Services
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            // [Singleton] which creates a single instance throughout the application. 
            //  It creates the instance for the first time and reuses the same object in the all calls.

            // [Scoped] lifetime services are created once per request within the scope.
            //  It is equivalent to Singleton in the current scope.
            //  eg. in MVC it creates 1 instance per each http request but uses the same instance in the other calls within the same web request.

            // [Transient] lifetime services are created each time they are requested.
            //  This lifetime works best for lightweight, stateless services.

            Uri endPoint = new Uri(configuration["RESTAPI:EndPoint"]);
            HttpClient httpClient = new HttpClient()
            {
                BaseAddress = endPoint
            };

            SmtpClient smptClient = new SmtpClient(configuration["EmailService:NetworkCredential:Host"], Convert.ToInt32(configuration["EmailService:NetworkCredential:Port"]))
            {
                Credentials = new NetworkCredential(configuration["EmailService:NetworkCredential:Email"], configuration["EmailService:NetworkCredential:Password"]),
                EnableSsl = true
            };

            services.AddSingleton(configuration);
            services.AddSingleton(httpClient);

            services.AddScoped(p => smptClient);

            return services;
        }
    }
}
