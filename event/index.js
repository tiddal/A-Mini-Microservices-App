import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/events', ({ body: event }, response) => {
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  response.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Listening on port 4005'));
