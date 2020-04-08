const express = require('express');
const path = require('path');

const app = express();

const { PORT = 5000 } = process.env;

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Checkd is running on port: ${PORT}`);
});