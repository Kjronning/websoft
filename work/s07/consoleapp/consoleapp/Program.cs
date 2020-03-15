using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace consoleapp
{
    class Program
    {
        static void Main(string[] args)
        {
            string JSONPath = "../../dotnet/data/account.json";
            List<Account> accounts = GetAccountsFromJSON(JSONPath);
            List<MenuOption> options = CreateMenuOptions(accounts);
            string menuString = "Welcome to the console menu!\n";
            for (int i = 0; i < options.Count; i++)
            {
                menuString = menuString + (i + 1) + ".- " + options[i].Description + "\n";
            }
            while (true)
            {
                Console.WriteLine(menuString);
                try
                {
                    int value = int.Parse(Console.ReadLine().ToString()) - 1;
                    if (value >= 0 && value < options.Count)
                        options[value].Execute();
                    else Console.WriteLine("Invalid input!");
                }
                catch
                {
                    Console.WriteLine("Invalid input!");
                }
            }
        }

        static void PrintAccount(Account account)
        {
            PrintAccountHeader();
            Console.Write(account.ToString());
            PrintAccountFooter();
        }

        static void PrintAccountFooter()
        {
            Console.WriteLine(new string('-', 46));
        }

        static void PrintAccountHeader()
        {
            string format = "| {0, 8} | {1, 10} | {2, 10} | {3, 5} |" + Environment.NewLine;
            var header = new StringBuilder().AppendFormat(format, "number", "balance", "label", "owner");
            Console.WriteLine(new string('-', 46));
            Console.Write(header);
            Console.WriteLine(new string('-', 46));
        }

        private static List<MenuOption> CreateMenuOptions(List<Account> accounts)
        {
            List<MenuOption> options = new List<MenuOption>();
            options.Add(new MenuOption("View Accounts", () =>
            {
                PrintAccountHeader();
                foreach (Account account in accounts)
                {
                    Console.Write(account.ToString());
                }
                PrintAccountFooter();
            }
            ));
            options.Add(new MenuOption("View account by number", () =>
            {
                while (true)
                {
                    Console.WriteLine("Enter an account number, or press enter to go back to menu.");
                    string input = Console.ReadLine().ToString();
                    try
                    {
                        int value = int.Parse(input);
                        int index = accounts.FindIndex(account => account.Number == value);
                        PrintAccount(accounts[index]);
                    }
                    catch
                    {
                        if (input == "")
                            break;
                        Console.WriteLine("Number not found!");

                    }

                }
            }));
            options.Add(new MenuOption("exit", () =>
            {
                Console.WriteLine("Exiting...!");
                Environment.Exit(0);
            }
        ));
            return options;
        }

        private static List<Account> GetAccountsFromJSON(string JSONPath)
        {
            using (StreamReader r = new StreamReader(JSONPath))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<Account>>(json);
            }
        }
    }

    class MenuOption
    {
        private string description;
        public Action Execute;

        public MenuOption(string description, Action Execute)
        {
            this.description = description;
            this.Execute = Execute;
        }

        public string Description { get => description; set => description = value; }

    }

    class Account
    {
        int number;
        int balance;
        string label;
        int owner;
        public Account(int number, int balance, string label, int owner)
        {
            this.Number = number;
            this.Balance = balance;
            this.Label = label;
            this.Owner = owner;
        }

        public int Number { get => number; set => number = value; }
        public int Balance { get => balance; set => balance = value; }
        public string Label { get => label; set => label = value; }
        public int Owner { get => owner; set => owner = value; }

        public override string ToString()
        {
            string format = "| {0, 8} | {1, 10} | {2, 10} | {3, 5} |" + Environment.NewLine;
            var tostring = new StringBuilder().AppendFormat(format, Number, Balance, Label, Owner);
            return tostring.ToString();
        }
    }
}
