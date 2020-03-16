using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace Webapp.Controllers
{
    [Route("api/[controller]/{number:int}")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public JSONFileReader AccountService { get; }

        public AccountController(JSONFileReader AccountService)
        {
            this.AccountService = AccountService;
        }

    [HttpGet]
    public Account Get(int number)
    {
        List<Account> accounts = AccountService.GetAccounts().ToList();
        int index = accounts.FindIndex(account => account.Number == number);
        return accounts[index];

    }
    }
}