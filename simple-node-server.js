var http = require('http');

var title = 'Hello World!';
var html = `
<html>
<head>
     <title>${title}</title>
     <link href="styles.css" rel="stylesheet">
     <script src="script.js"></script>
</head>
<body>
<h1>${title}</h1>
     <p>I am a Node.js server, and i can send back a web page</p>
</body>
</html>
`;

var css = `
body {
     background-color: yellow;
}
`
var javascript = `
     alert('Hello world!')
`


var server = http.createServer(function(request, response) {

     var url = request.url;
     if (url === '/') {
          response.write(html);
     } else if (url === '/script.js') {
          response.write(javascript);
     } else if (url === '/styles.css') {
          response.write(css);
     }
     response.end();

});

server.listen(8000, function() {
     console.log('Listening on port 8000');
});
