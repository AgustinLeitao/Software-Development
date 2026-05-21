using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TripTracker.UI.Data;

namespace TripTracker.UI.Areas.Admin.Controllers
{
    [Area("Admin")] // Basicamente areas copia la estructura del proyecto. Se agregan cosas extras. Provee una forma de aislar secciones que no son de la pagina normal. Por ejemplo una zona de admin. Eso podria estar en areas.
	public class AccountController : Controller
	{
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly ILogger _logger;

		public AccountController(SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger)
		{
			_signInManager = signInManager;
			_logger = logger;
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Logout()
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation("User logged out.");
			return RedirectToPage("/Index");
		}

	}
}
