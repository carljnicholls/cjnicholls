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
        LinkedIn: 'https://linkedin.com/in/carl-nicholls-0b8252144',
        Résumé: '/pdf/cv.pdf'
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