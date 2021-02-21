import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  };
  if (type === 'CommentCreated') {
    const { id, postId, content, status } = data;
    posts[postId].comments = [...posts[postId].comments, { id, content, status }];
  };
  if (type === 'CommentUpdated') {
    const { postId, id, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;
  handleEvent(type, data);
  response.send({});
});

app.listen(4002, async () => {
  console.log('Listening on port 4002');
  const response = await axios.get('http://event-service:4005/events');
  for (let { type, data } of response.data) {
    console.log('Processing event:', type);
    handleEvent(type, data);
  }
});
