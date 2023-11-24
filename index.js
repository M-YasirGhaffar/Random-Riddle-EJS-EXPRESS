const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    // Fetch data from the random riddle API using Axios
    const response = await axios.get('https://riddles-api.vercel.app/random');
    const riddle = response.data; // Assuming the API returns a single riddle
    console.log(riddle)

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
