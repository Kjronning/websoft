using consoleapp.Model;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System;

namespace consoleapp.Services
{
    class JSONFileService
    {
        readonly static string PATH = "../../../data/account.json";

        public static List<Account> GetAccounts()
        {
                using (StreamReader r = new StreamReader(PATH))
                {
                    string json = r.ReadToEnd();
                    return JsonConvert.DeserializeObject<List<Account>>(json);
                };
            }

        public static void Save(List<Account> accounts)
        {
            
            using(StreamWriter w = new StreamWriter(PATH))
            {
                string json = JsonConvert.SerializeObject(accounts);
                w.Write(json);
            }
        }
    }
}

