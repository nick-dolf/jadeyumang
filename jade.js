const PORT = 3013;
const express = require('express');
const app = express();
module.exports = app;

const sass = require('sass');
const fs = require('fs');
const path = require('path')
const slugify = require('slugify')
const morgan = require('morgan')
app.use(morgan('tiny'))
require('dotenv').config()

// Live Reload
const livereload = require('livereload')
const liveReloadServer = livereload.createServer()
liveReloadServer.watch(path.join(__dirname, 'site'))

const connectLivereload = require('connect-livereload')
app.use(connectLivereload())

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Template Engine
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'src/views'))
app.locals.pretty = true;

// var multer=require("multer");
// var upload=multer({dest:"uploads/"});
// app.post("/upload",upload.single("upl"),function(req,res){
// console.log(req.file);
// });

app.get('/image', (req, res) => {
  res.sendFile('./image.html', {root: __dirname})
})

//app.use('/pages', pages);
app.use('/admin', require('./admin/admin'));
//app.use('/images', images);


// Render SASS
sass.render({
  file: './src/sass/main.scss'
}, (err, result) => {
  if (err) {
    console.error(err.message)
  } else {
    fs.writeFile('./site/assets/css/style.css', result.css.toString(), (err) => {
      if (err) console.error(err.message);
    });
  }
});

// Serve Static Pages and Assets
app.use(express.static('site'));
app.use('/src/assets', express.static('src/assets'));


app.listen(PORT, () => {console.log(`listening on ${PORT}...`)});
