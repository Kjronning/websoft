using Newtonsoft.Json;
using System;
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

    internal void Transfer(int outgoing, int incoming, int amount)
    {
        List<Account> accounts = new List<Account>(GetAccounts());
        Console.WriteLine("outgoing: " + outgoing);
        Console.WriteLine("incoming: " + incoming);
        Console.WriteLine("amount: " + amount);
        int outgoingIndex = accounts.FindIndex(account => account.Number == outgoing);
        int incomingIndex = accounts.FindIndex(account => account.Number == incoming);
        accounts[outgoingIndex].Balance -= amount;
        accounts[incomingIndex].Balance += amount;
        SaveAccounts(accounts);
    }
}