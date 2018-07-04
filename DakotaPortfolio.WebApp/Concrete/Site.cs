using System.Collections.Generic;

namespace DakotaPortfolio.WebApp.Concrete
{
    public class Site
    {
        public string Name { get; set; }

        public ICollection<Meta> Metas { get; set; }
        public ICollection<Schema> Schemas { get; set; }
    }
}
