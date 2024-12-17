import React, { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface APIUser {
  id: number;
  username: string;
}

interface APIComment {
  id: number;
  body: string;
  postId: number;
  user: APIUser;
}

interface APIResponse {
  comments: APIComment[];
  total: number;
  skip: number;
  limit: number;
}

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface CommentData {
  id: number;
  body: string;
  postId: number;
  user: User;
  likes: number;
}

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data: APIResponse) => {
        const transformedComments = data.comments.map((c) => {
          return {
            id: c.id,
            body: c.body,
            postId: c.postId,
            likes: 0,
            user: {
              id: c.user.id,
              username: c.user.username,
              fullName: c.user.username,
            },
          } as CommentData;
        });

        setComments(transformedComments);
      })
      .catch((err) => console.error("Błąd przy pobieraniu komentarzy:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Komentarze z API</h2>
      {comments.map((comment) => (
        <Komentarz
          key={comment.id}
          id={comment.id}
          body={comment.body}
          postId={comment.postId}
          likes={comment.likes}
          user={comment.user}
        />
      ))}
    </div>
  );
};

export default Komentarze;
