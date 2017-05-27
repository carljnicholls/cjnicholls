﻿/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', {
        title: 'CJNicholls',
        intro: 'Recently completed a BSc in Computing at Plymouth University. I have particular interests in bleeding edge technologies and current events within the technology domain. ',
        bio: 'winner'
    });
});

router.get('/contact', (req: express.Request, res: express.Response) => {
    res.render('contact', {
        title: 'Contact',
        intro: 'Lorem ipsum dolor sit amet, mauris nibh eget nulla dolor dolor, ' +
            'pellentesque dignissim aliquam est leo urna, eu magna amet erat cubilia, ' +
            'sit eget amet augue, tellus vestibulum hendrerit amet nam eget.Sed enim tempor eget sed magna, ' +
        'vel nunc tortor tincidunt ut, ac ad habitasse, urna cum integer libero faucibus.',
        aboutSummary: ''
    });
});

export default router;