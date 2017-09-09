using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CJNichollsWebsite.Models;

namespace CJNichollsWebsite.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(new IndexViewModel());
        }

        public IActionResult ReadingList()
        {
            return View(new ReadingListViewModel());
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
