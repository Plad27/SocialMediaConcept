const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VibeDev',
  password: '11111',
  port: 5432,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// test route 
app.get('/test', (req, res) => {
  res.send('test');
  console.log('test');
});

// Route to Home Page
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Route to feedback page
app.get('/feedback', (req, res) => {
    res.sendFile('/Users/plad/Documents/CodingFiles/GitRepo/SocialMediaConcept/feedback.html');
  });
  
// Route to subscribe page
app.post('/subscribe/:email_id', async (req, res) => {
  const { email_id } = req.body;

  try {
    
    await pool.query('INSERT INTO email_subscribers.email_id VALUES ($1)', [email_id]);
    res.send('Thank you for subscribing! You will receive the latest updates.');
  } catch (err) {
    console.error(err);
    res.send('There was an error saving your subscription.');
  }
});

// Viewing all the users from websites 
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
  }
});


//Login with respect username and password 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

      if (result.rows.length > 0) {
          
          res.sendFile(userPage.html)
      } else {
          res.send('Invalid username or password.');
      }
  } catch (err) {
      console.error(err)
  }
});


//sever listening 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
