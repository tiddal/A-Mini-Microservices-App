import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;
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
  response.send({});
});

app.listen(4002, () => console.log('Listening on port 4002'));
