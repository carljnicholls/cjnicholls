using System.Collections.Generic;

namespace CJNichollsWebsite.Models
{
    public class ReadingListViewModel : TemplateViewModel
    {
        public string  Main { get; set; }
        public Dictionary<string, string> ReadingList { get; set; }

        public ReadingListViewModel()
        {
            Title = "Reading List";
            Main = "We all find resources that we feel should be shared due to their impact. " +
                "This may be due to how the content is presented to the user or the " +
                "subject matter. This is my own list.";
            ReadingList = new Dictionary<string, string>{
                { "Practical Color Theory for People Who Code", "https://tallys.github.io/color-theory/" },
                { "Live CO2 emissions of Electricity Consumption", "https://www.electricitymap.org/?wind=true&solar=true&page=map" },
                { "Why is .NET reflection slow?", "http://mattwarren.org/2016/12/14/Why-is-Reflection-slow/" },
                { "Great. Now Even Your Headphones Can Spy on You", "https://www.wired.com/2016/11/great-now-even-headphones-can-spy/" },
                { "A collection of awesome .NET libraries, tools, frameworks, and software.", "https://github.com/quozd/awesome-dotnet" },
                { "A collection of awesome browser-side JavaScript libraries, resources and shiny things.", "https://github.com/sorrycc/awesome-javascript" },
                { "Apple Forces Recyclers to Shred All iPhones and MacBooks", "https://motherboard.vice.com/en_us/article/apple-recycling-iphones-macbooks" }
            };
        }

        public ReadingListViewModel(string title, string main, Dictionary<string, string> readingList)
        {
            Title = title;
            Main = main;
            ReadingList = readingList; 
        }
    }
}
