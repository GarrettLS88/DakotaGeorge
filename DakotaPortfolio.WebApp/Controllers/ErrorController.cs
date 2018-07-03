using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace DakotaPortfolio.WebApp.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult Index()
        {
            //Exception exception = HttpContext.Features.Get<IExceptionHandlerFeature>().Error;

            return View();
        }

        [Route("Error/404")]
        public IActionResult Status404()
        {
            return View();
        }
    }
}