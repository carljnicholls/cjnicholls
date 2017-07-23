import express = require('express');
const router = express.Router();

/*
 * GET home page.
 */
router.get('/', (req: express.Request, res: express.Response) => {
    var contact = {
        Email: 'mailto:carljnicholls@hotmail.com',
        GitHub: 'https://github.com/carljnicholls',
        LinkedIn: 'https://linkedin.com/in/carl-nicholls',
        Résumé: '/pdf/cv.pdf'
    };

    res.render('index', {
        title: 'Carl James Nicholls',
        intro: '2016-17 graduate in BSc (Hons) Computing from the University of Plymouth. ' +
                'Full stack developer with experience in .NET, OO, Node.js, Azure, JavaScript, Bootstrap 3 and mini.css. ',
        main: 'Interests include current scientific and technological events, bleeding edge technologies ' +
                'as well as the potential applications or consequences.' ,
        sideElement: 'Contact:',
        contact: contact
    });
});

/*
 * GET reading list.
 */
router.get('/readinglist', (req: express.Request, res: express.Response) => {
    var resources = {
        'Practical Color Theory for People Who Code': 'https://tallys.github.io/color-theory/',
        'Live CO2 emissions of Electricity Consumption': 'https://www.electricitymap.org/?wind=true&solar=true&page=map',
        'Why is .NET reflection slow?': 'http://mattwarren.org/2016/12/14/Why-is-Reflection-slow/',
        'Great. Now Even Your Headphones Can Spy on You': 'https://www.wired.com/2016/11/great-now-even-headphones-can-spy/',
        'A collection of awesome .NET libraries, tools, frameworks, and software.': 'https://github.com/quozd/awesome-dotnet',
        'A collection of awesome browser-side JavaScript libraries, resources and shiny things.': 'https://github.com/sorrycc/awesome-javascript',
        'Apple Forces Recyclers to Shred All iPhones and MacBooks': 'https://motherboard.vice.com/en_us/article/apple-recycling-iphones-macbooks'
    };

    res.render('reading-list', {
        title: 'Reading List',
        main: 'We all find books and resources that we feel should be shared due to their impact. ' +
                'This may be due to how the content is presented to the user or the ' +
                'subject matter. This is my own list.',
        resources: resources
    });
});

/*
 * GET robots.txt.
 * dont index cv
 */
router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send(
        "User-agent: *\nAllow: /  \n" +
        "User-agent: *\nDisallow: /pdf/  \n" +
        "Noindex: /pdf/"
    );
});

export default router;