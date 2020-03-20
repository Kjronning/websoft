using consoleapp.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace consoleapp.Services
{
    class AccountsService
    {
        List<Account> accounts;
        public AccountsService()
        {
            accounts = JSONFileService.GetAccounts();
        }

        public void CreateAccount(int Number, int Balance, string Label, int Owner)
        {
            Account account = new Account(Number, Balance, Label, Owner);
            accounts.Add(account);
            JSONFileService.Save(accounts);
        }

        public void MoveBalance(int outgoingAccountNumber, int incomingAccountNumber, int amount)
        {
            int outgoingIndex = GetAccountIndexByNumber(outgoingAccountNumber);
            int incomingIndex = GetAccountIndexByNumber(incomingAccountNumber);
            if (amount < 0)
            {
                Console.WriteLine("Invalid amount.");
                return;
            }
            if(amount > accounts[outgoingIndex].Balance)
            {
                Console.WriteLine("Balance too low.");
                return;
            }

            accounts[outgoingIndex].Balance -= amount;
            accounts[incomingIndex].Balance += amount;

            JSONFileService.Save(accounts);
        }
        public void PrintAccount(Account account)
        {
            PrintAccountHeader();
            Console.Write(account.ToString());
            PrintAccountFooter();
        }

        public bool IsAccountByNumber(int value)
        {
            return (SearchAccountByNumber(value) != null);
        }
        
        private Account SearchAccountByNumber(int value)
        {
            int index = GetAccountIndexByNumber(value);
            return index == -1 ? null : accounts[index];
        }

        private int GetAccountIndexByNumber(int value)
        {
            return accounts.FindIndex(account => account.Number == value);
        }

        private void PrintAccountByNumber(int value)
        {
            PrintAccount(SearchAccountByNumber(value));
        }

        private static void PrintAccountFooter()
        {
            Console.WriteLine(new string('-', 46));
        }

        private static void PrintAccountHeader()
        {
            string format = "| {0, 8} | {1, 10} | {2, 10} | {3, 5} |" + Environment.NewLine;
            var header = new StringBuilder().AppendFormat(format, "number", "balance", "label", "owner");
            Console.WriteLine(new string('-', 46));
            Console.Write(header);
            Console.WriteLine(new string('-', 46));
        }

        public bool ViewAccountByNumber(string input)
        {
            bool isValid = ValidateAccountNumber(input);
            if (isValid)
                PrintAccountByNumber(ValidateIntInput(input));
            return isValid;
        }

        public bool ValidateAccountNumber(string input)
        {
            int value = ValidateIntInput(input);
            if (value != -1)
            {
                return true;
            }
            Console.WriteLine("Account number not found.");
            return false;
        }

        public void PrintAllAccounts()
        {
            PrintAccounts(this.accounts);
        }

        private void PrintAccounts(List<Account> accounts)
        {
            PrintAccountHeader();
            foreach (Account account in accounts)
            {
                Console.Write(account.ToString());
            }
            PrintAccountFooter();
        }

        internal void SearchAccounts(string searchString)
        {
            List<Account> resultAccounts = new List<Account>();
            try
            {
                int searchNumber = int.Parse(searchString);
                foreach (Account account in accounts)
                {
                    if (searchNumber == account.Number || searchNumber == account.Owner)
                        resultAccounts.Add(account);
                }
            }
            catch
            {
                foreach (Account account in accounts)
                {
                    if (account.Label.Contains(searchString))
                        resultAccounts.Add(account);
                }
            }
            PrintAccounts(resultAccounts);
        }

        internal bool FindAccountByNumber(int value)
        {
            if (!IsAccountByNumber(value))
            {
                Console.WriteLine("Invalid account number.");
                return false;
            }
            return true;
        }

        public int ValidateIntInput(string input)
        {
            try
            {
                return int.Parse(input);
            }
            catch
            {
                Console.WriteLine("Invalid input.");
                return -1;
            }
        }
    }
}
