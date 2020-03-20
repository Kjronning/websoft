using System;
using System.Collections.Generic;
using System.Text;

namespace consoleapp.Model
{
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
