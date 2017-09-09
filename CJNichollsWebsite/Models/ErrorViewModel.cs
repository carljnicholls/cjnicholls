using System;

namespace CJNichollsWebsite.Models
{
    public class ErrorViewModel : TemplateViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

        public ErrorViewModel()
        {
            Title = "To err is to human. ";
        }
    }
}