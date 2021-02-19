import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (request, response) => response.send(commentsByPostId[request.params.id] || []));

app.post('/posts/:id/comments', async (request, response) => {
  const postId = request.params.id;
  const id = randomBytes(4).toString('hex');
  const { content } = request.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content });
  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id, content, postId }
  });

  response.status(201).send(comments);
});

app.post('/events', (request, response) => {
  console.log('Received Event', request.body.type);
  response.send({});
});

app.listen(4001, () => console.log('Listening on port 4001'));
