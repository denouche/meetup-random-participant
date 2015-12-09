var q = require('q'),
    htmlparser = require('htmlparser2'),
    request = require('request'),
    _ = require('lodash');



function getCitation() {
    var deferred = q.defer();
    var users = [];
    request({
        url: 'http://www.meetup.com/fr/ChtiJUG/events/226992012/',
        method: 'GET',
        gzip: true,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'deflate, gzip',
            'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': 'www.meetup.com',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'
        }
    }, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var domUtils = require('htmlparser2').DomUtils;
            var handler = new htmlparser.DomHandler(function(err, dom) {
                var list = domUtils.findAll(function (elem) {
                    if(elem.attribs && elem.attribs.class && elem.attribs.class.indexOf('member-name') !== -1) {
                        return true;
                    }
                    return false;
                }, dom);
                list.forEach(function(member) {
                    if(member.type === 'tag' && member.name === 'h5') {
                        users.push(member.children[0].next.children[0].data);
                    }
                    deferred.resolve(users);
                });
            });
            new htmlparser.Parser(handler).parseComplete(body);
        }
    });
    return deferred.promise;
}


getCitation()
    .then(function(users) {
        console.log('Sur un total de ' + users.length + ' participants');
        console.log(users[_.random(0, users.length - 1)])
    });


