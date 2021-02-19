import axios from "axios";
import { useEffect, useState } from "react";

const CommentList = ({ postId }) => {

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(data);
  };

  useEffect(() => { fetchComments(); }, []);


  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>
      {comment.content}
    </li>
  ));

  return <ul>{renderedComments}</ul>;

};

export default CommentList;