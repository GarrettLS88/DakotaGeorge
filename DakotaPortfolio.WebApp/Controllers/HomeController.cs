using DakotaPortfolio.WebApp.Concrete;
using DakotaPortfolio.WebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DakotaPortfolio.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _httpClient;

        public HomeController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IActionResult> Index()
        {
            HomeIndexVM vm = new HomeIndexVM()
            {
                Site = await GetWebsiteData()
            };

            return View(vm);
        }

        private async Task<Site> GetWebsiteData()
        {
            Site site = null;
            HttpResponseMessage response = await _httpClient.GetAsync("api/v1/site/dakota_george_portfolio");

            if (response.StatusCode == HttpStatusCode.OK)
            {
                string strSite = response.Content.ReadAsStringAsync().Result.ToString();
                site = JsonConvert.DeserializeObject<Site>(strSite);
            }
            else
            {
                site = new Site()
                {
                    Schemas = new List<Schema>(),
                    Metas = new List<Meta>()
                };
            }

            return site;
        }
    }
}
