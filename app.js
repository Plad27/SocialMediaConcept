const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VibeDev',
  password: '12345',
  port: 5432,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to Home Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to feedback page
app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + '/public/feedback.html');
  });
  
// Route to subscribe page
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    
    await pool.query('INSERT INTO subscribers (email) VALUES ($1)', [email]);
    res.send('Thank you for subscribing! You will receive the latest updates.');
  } catch (err) {
    console.error(err);
    res.send('There was an error saving your subscription.');
  }
});


app.get('/subs/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    
    const result = await pool.query('SELECT * FROM email_subscribers WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.send(`
        <p>Email: ${email_subscribers.emai_id}</p>
        <p>Joined on: ${email_subscribers.joined_date}</p>
      `);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});