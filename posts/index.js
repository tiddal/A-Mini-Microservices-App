import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => response.send(posts));

app.post('/posts', async (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;
  posts[id] = { id, title };
  await axios.post('http://event-service:4005/events', {
    type: 'PostCreated',
    data: { id, title }
  });
  response.status(201).send(posts[id]);
});

app.post('/events', (request, response) => {
  console.log('Received Event', request.body.type);
  response.send({});
});

app.listen(4000, () => console.log('Listening on port 4000'));
