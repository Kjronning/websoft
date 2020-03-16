using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;    
using Microsoft.AspNetCore.Mvc;
using webapp.Models;

namespace Webapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        public JSONFileReader AccountService{ get; }

        public AccountsController(JSONFileReader AccountService)
        {
            this.AccountService = AccountService;
        }

        [HttpGet]
        public IEnumerable<Account> Get()
        {
            return AccountService.GetAccounts();
        }
    }
}