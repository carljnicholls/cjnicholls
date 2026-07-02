using System.Collections.Generic;

namespace CJNichollsWebsite.Models
{
    public class IndexViewModel : TemplateViewModel
    {
        public string Intro { get; set; }
        public string Main { get; set; }
        public string SideElementTitle { get; set; }
        public string DisplayPictureLocation { get; set; }
        public Dictionary<string, string> ContactInfo { get; set; }

        public IndexViewModel()
        {
            Title = "Carl James Nicholls";
            Intro = "2016-17 graduate in BSc (Hons) Computing from the University of Plymouth. " +
                "Full stack developer with experience in .NET & Core, OO, Node.js, Azure, JavaScript, Bootstrap 3 and mini.css. ";
            Main = "Interests include current scientific and technological events, bleeding edge technologies " +
                "as well as the potential applications or consequences.";
            SideElementTitle = "Contact";
            DisplayPictureLocation = "/images/pic.jpg"; 
            ContactInfo = new Dictionary<string, string>(){
                { "Email", "mailto:carljnicholls@hotmail.com"},
                { "GitHub", "https://github.com/carljnicholls" },
                { "LinkedIn", "https://linkedin.com/in/carl-nicholls" },
                { "Résumé", "/pdf/cv.pdf" }
            };

            // force runtime error to see error view 
            Title = null;
            var i = Title.Split(' ');
        }

        public IndexViewModel(string title, string intro, string main, string sideElementTitle, string displayPictureLocation, Dictionary<string, string> contactInfo)
        {
            Title = title;
            Intro = intro;
            Main = main;
            SideElementTitle = sideElementTitle;
            DisplayPictureLocation = displayPictureLocation;
            ContactInfo = contactInfo;
        }
    }
}
