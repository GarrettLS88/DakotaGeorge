using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DakotaPortfolio.WebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DakotaPortfolio.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            HomeIndexVM vm = new HomeIndexVM();

            return View(vm);
        }
    }
}
