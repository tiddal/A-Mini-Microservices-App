import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const events = [];

app.post('/events', ({ body: event }, response) => {
  events.push(event);
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);
  response.send({ status: 'OK' });
});

app.get('/events', (request, response) => response.send(events));

app.listen(4005, () => console.log('Listening on port 4005'));
