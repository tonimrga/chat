const path = require('path');
const express = require('express');

const port = procces.env.PORT || 3000;
var app = express();
var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
})
