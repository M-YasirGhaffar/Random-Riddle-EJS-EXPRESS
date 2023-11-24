const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://riddles-api.vercel.app/random');
    const riddle = response.data;

    res.render('index', { riddle });
  } catch (error) {
    console.error('Error fetching riddle:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
