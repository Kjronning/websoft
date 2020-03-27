using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using webapp.Models;

namespace Webapp.Pages
{
    public class MoveModel : PageModel
    {
        public int outgoing;
        public int incoming;
        public int amount;
        public JSONFileReader AccountService { get; }

        public MoveModel(JSONFileReader AccountService)
        {
            this.AccountService = AccountService;
        }

    }
}