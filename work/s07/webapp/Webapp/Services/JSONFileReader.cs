using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using webapp.Models;

public class JSONFileReader
{
    static string JSONPath = "../../dotnet/data/account.json";

    public IEnumerable<Account> GetAccounts()
    {
        
            using (StreamReader r = new StreamReader(JSONPath))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Account>>(json);
            }
        
    }

    public void SaveAccounts(IEnumerable<Account> accounts)
    {
        using (StreamWriter w = new StreamWriter(JSONPath))
        {
            string json = JsonConvert.SerializeObject(accounts);
            w.Write(json);
        }
    }
}