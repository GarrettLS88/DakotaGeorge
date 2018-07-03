using DakotaPortfolio.WebApp.Concrete;
using System;

namespace DakotaPortfolio.WebApp.Abstract
{
    public interface IEmailServices
    {
        void Send(Email email);
        void Error(Exception ex);
    }
}
