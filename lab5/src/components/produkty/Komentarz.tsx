import React, { useState } from "react";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({
  id,
  body,
  postId,
  likes: initialLikes,
  user,
}) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setLikes((prev) => prev - 1);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#000000",
      }}
    >
      <h3 style={{ margin: "5px 0" }}>Komentarz #{id}</h3>
      <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
        <strong>Autor:</strong> {user.fullName} (@{user.username})<br />
        <strong>Post ID:</strong> {postId}
      </p>
      <p style={{ margin: "10px 0" }}>{body}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={handleLike} style={{ cursor: "pointer" }}>
          👍
        </button>
        <button onClick={handleDislike} style={{ cursor: "pointer" }}>
          👎
        </button>
        <span>
          <strong>Likes:</strong> {likes}
        </span>
      </div>
    </div>
  );
};

export default Komentarz;
