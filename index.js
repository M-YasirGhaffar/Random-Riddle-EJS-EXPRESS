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
    // Fetch data from the random riddle API using Axios
    const response = await axios.get('https://riddles-api.vercel.app/random');
    const riddle = response.data.riddle; // Assuming the API returns a single riddle
    console.log(riddle)
    // res.send(riddle)
    const answer = response.data.answer;
    console.log(answer)
    res.send("Riddle: "+riddle + "\n \nAnswer: " + answer)

    // Render the EJS template with the fetched data
    res.render('index', { riddle });
  } catch (error) {
    console.error('Error fetching riddle:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
