using consoleapp.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace consoleapp.Services
{
    class Menu
    {
        AccountsService accountsService;

        internal void Print()
        {
            string menuString = "Welcome to the console menu!\n";
            int index = 1;
            foreach (string description in GetDescriptions())
            {
                menuString = menuString + index++ + ".- " + description + "\n";
            }
            while (true)
            {
                Console.WriteLine(menuString);
                try
                {
                    int value = int.Parse(Console.ReadLine().ToString()) - 1;
                    ExecuteOption(value);
                }
                catch
                {
                    Console.WriteLine("Invalid input!");
                }
            }
        }

        private Dictionary<string, Action> options;

        public Menu()
        {
            accountsService = new AccountsService();
            options = CreateMenuOptions();
        }

        private List<string> GetDescriptions()
        {
            return new List<string>(options.Keys);
        }

        private void ExecuteOption(int index)
        {
            options[GetDescriptions()[index]].Invoke();
        }

        private Dictionary<string, Action> CreateMenuOptions()
        {
            Dictionary<string, Action> options = new Dictionary<string, Action>();
            options.Add("View Accounts", () =>
            {
                accountsService.PrintAllAccounts();
            });
            options.Add("View account by number", () =>
            {
                string input;
                do
                {
                    Console.WriteLine("Enter an account number, or press enter to go back to menu.");
                    input = Console.ReadLine().ToString();
                    if (input == "")
                        break;
                }
                while (accountsService.ViewAccountByNumber(input));
            });
            options.Add("Search", () =>
            {
                string searchString;
                Console.WriteLine("Please enter search criterion: ");
                searchString = Console.ReadLine().ToString();
                accountsService.SearchAccounts(searchString);

            });
            options.Add("Move money between accounts", () =>
            {
                while (true)
                {
                    Console.WriteLine("Move money between accounts. Press enter at any point to exit.");
                    Console.WriteLine("Enter outgoing account number: ");
                    string input = Console.ReadLine();
                    if (input == "")
                        break;
                    if (!accountsService.ValidateAccountNumber(input))
                        continue;
                    int outgoingAccountNumber = int.Parse(input);

                    Console.WriteLine("Enter incoming account number: ");
                    input = Console.ReadLine();
                    if (input == "")
                        break;
                    if (!accountsService.ValidateAccountNumber(input))
                        continue;
                    int incomingAccountNumber = int.Parse(input);

                    Console.WriteLine("Enter amount (only positive): ");
                    input = Console.ReadLine();
                    if (input == "")
                        break;
                    if (accountsService.ValidateIntInput(input) == -1)
                        continue;
                    int amount = int.Parse(input);

                    accountsService.MoveBalance(outgoingAccountNumber, incomingAccountNumber, amount);
                    break;
                }
            });
            options.Add("Create new account", () =>
            {
                while (true)
                {
                    int Number, Balance, Owner;
                    string Label;
                    string input;
                    int value;
                    Console.WriteLine("Enter Number, or enter to go back: ");
                    input = Console.ReadLine();
                    if (input == "")
                        return;
                    value = accountsService.ValidateIntInput(input);
                    if(value == -1)
                    {
                        Console.WriteLine("Input incorrect.");
                        continue;
                    }
                    Number = value;
                    Console.WriteLine("Enter Balance, or enter to go back: ");
                    input = Console.ReadLine();
                    if (input == "")
                        break;
                    value = accountsService.ValidateIntInput(input);
                    if (value == -1)
                    {
                        Console.WriteLine("Input incorrect.");
                        continue;
                    }
                    Balance = value;
                    Console.WriteLine("Enter Label, or enter to go back: ");
                    input = Console.ReadLine();
                    if (input == "")
                        break;
                    Label = input;
                    Console.WriteLine("Enter Owner, or enter to go back: ");
                    input = Console.ReadLine();
                    if (input == "")
                        break;
                    value = accountsService.ValidateIntInput(input);
                    if (value == -1)
                    {
                        Console.WriteLine("Input incorrect.");
                        continue;
                    }
                    Owner = value;
                    accountsService.CreateAccount(Number, Balance, Label, Owner);
                    break;
                }
            });
            options.Add("exit", () =>
            {
                Console.WriteLine("Exiting...!");
                Environment.Exit(0);
            });
            return options;
        }
    }

}
