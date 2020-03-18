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
        public IActionResult Post([FromForm]int outgoing, [FromForm] int incoming, [FromForm] int amount)
        {
            AccountService.Transfer(outgoing, incoming, amount);
            return Redirect("https://localhost:44369/");
        }

        [HttpPut]
        public IActionResult Put([FromBody]int outgoing, [FromBody] int incoming, [FromBody] int amount)
        {
            AccountService.Transfer(outgoing, incoming, amount);
            return Redirect("https://localhost:44369/");
        }
    }
}