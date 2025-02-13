import items from "../../mock/post.json";
import React from "react";
import { Link } from "react-router-dom";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function PostListItem({ item }) {
  return (
    <div className="PostListItem">
      <img src={item.imageUrl} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.badgeCount}</p>
        <p>{formatDate(item.createdAt)}</p>
      </div>
    </div>
  );
}
function HomePage() {
  return (
    <ul>
      <nav>
        <ul>
          <li>
            <Link to="/post">게시판</Link>
          </li>
          <li>
            <Link to="/error">에러</Link>
          </li>
        </ul>
      </nav>
      {items.map((item) => {
        return (
          <li>
            <PostListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default HomePage;
