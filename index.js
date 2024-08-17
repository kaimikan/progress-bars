import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'progress-bars',
  password: 'grespass',
  port: 5432,
});
db.connect();

app.use(express.static('public'));

async function getProgressBars() {
  try {
    const response = await db.query('SELECT * FROM progress_bars');
    const progressBars = response.rows;
    console.log({ progressBars });
    return { progressBars: progressBars };
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}

app.get('/', async (req, res) => {
  const fetchedProgressBars = await getProgressBars();

  res.render('index.ejs', fetchedProgressBars);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
