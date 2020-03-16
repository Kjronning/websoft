using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using webapp.Models;

public class JSONFileReader
{
    public IEnumerable<Account> GetAccounts()
    {
        
            string JSONPath = "../../dotnet/data/account.json";
            using (StreamReader r = new StreamReader(JSONPath))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Account>>(json);
            }
        
    }
}