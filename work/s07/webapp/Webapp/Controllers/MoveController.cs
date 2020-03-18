using System;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace Webapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoveController : ControllerBase
    {
        public JSONFileReader AccountService { get; }

        public MoveController(JSONFileReader AccountService)
        {
            this.AccountService = AccountService;
        }

        [HttpPost]
        public IActionResult Post([FromForm]int outgoing,[FromForm] int incoming,[FromForm] int amount)
        {
            List<Account> accounts = new List<Account>(AccountService.GetAccounts());
            Console.WriteLine("outgoing: " + outgoing);
            Console.WriteLine("incoming: " + incoming);
            Console.WriteLine("amount: " + amount);
            int outgoingIndex = accounts.FindIndex(account => account.Number == outgoing);
            int incomingIndex = accounts.FindIndex(account => account.Number == incoming);
            accounts[outgoingIndex].Balance -= amount;
            accounts[incomingIndex].Balance += amount;
            AccountService.SaveAccounts(accounts);

            return Redirect("https://localhost:44369/");
        }
    }
}