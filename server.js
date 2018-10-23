const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Need a place to store heroku.com port
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Jerry',
  //   likes: [
  //     'Biking','Yayoi'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Our Home',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hello, Jerry! Welcome to the web page'
  });
});

app.get('/about',(req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send( {
    errorCode: '12345',
    errorText: 'Unable to process the request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
