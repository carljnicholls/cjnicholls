"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    var contact = {
        Email: 'mailto:carljnicholls@hotmail.com',
        GitHub: 'https://github.com/carljnicholls',
        LinkedIn: 'https://linkedin.com/in/carl-nicholls'
        //,
        //Résumé: '/pdf/cv.pdf'
    };
    res.render('index', {
        title: 'CJNicholls',
        main: '2016-17 graduate in BSc(Hons) Computing from University of Plymouth. ' +
            'Full stack developer with experience in .NET, OO, Node.js and client side scripting. ' +
            'Interests include scientific and technological current events, bleeding edge technologies ' +
            'as well as the potential applications of these technologies.',
        sideElement: 'Contact:',
        contact: contact
    });
});
router.get('/readinglist', function (req, res) {
    var resources = {
        'Practical Color Theory for People Who Code': 'https://tallys.github.io/color-theory/',
        'Live CO2 emissions of Electricity Consumption': 'https://www.electricitymap.org/?wind=true&solar=true&page=map',
        'Why is .NET reflection slow?': 'http://mattwarren.org/2016/12/14/Why-is-Reflection-slow/',
        'Great. Now Even Your Headphones Can Spy on You': 'https://www.wired.com/2016/11/great-now-even-headphones-can-spy/',
        'A collection of awesome .NET libraries, tools, frameworks, and software.': 'https://github.com/quozd/awesome-dotnet',
        'A collection of awesome browser-side JavaScript libraries, resources and shiny things.': 'https://github.com/sorrycc/awesome-javascript',
        'Apple Forces Recyclers to Shred All iPhones and MacBooks': 'https://motherboard.vice.com/en_us/article/apple-recycling-iphones-macbooks',
        '': ''
    };
    res.render('reading', {
        title: 'Reading List',
        main: 'We all find books and resources that we feel should be shared due to their impact. ' +
            'This may be due to how the content is presented to the user or the ' +
            'subject matter. This is my own list.',
        resources: resources
    });
});
//router.get('/contact', (req: express.Request, res: express.Response) => {
//    res.render('contact', {
//        title: 'Contact',
//        main: '',
//        intro: 'Lorem ipsum dolor sit amet, mauris nibh eget nulla dolor dolor, ' +
//            'pellentesque dignissim aliquam est leo urna, eu magna amet erat cubilia, ' +
//            'sit eget amet augue, tellus vestibulum hendrerit amet nam eget.Sed enim tempor eget sed magna, ' +
//            'vel nunc tortor tincidunt ut, ac ad habitasse, urna cum integer libero faucibus.',
//        sideElement: 'The general rendering process of Pug is simple. pug.compile() will compile the Pug source code into a JavaScript function that takes a data object (called “locals”) as an argument. Call that resultant function with your data, and voilà!, it will return a string of HTML rendered with your data.'
//    });
//});
exports.default = router;
//# sourceMappingURL=index.js.map