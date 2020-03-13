using System;

namespace consoleapp
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("Welcome to the console menu!\n"
                    + "1.- Open\n"
                    + "2.- Close\n"
                    + "3.- Exit");
                switch (Console.ReadLine().ToString())
                {
                    case "1":
                        Console.WriteLine("Opened!");
                        break;
                    case "2":
                        Console.WriteLine("Closed!");
                        break;
                    case "3":
                        Console.WriteLine("Exiting...!");
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("Not a valid option!!");
                        break;
                }
            }
        }
    }
}
