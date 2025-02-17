import items from "../../mock/post.json";
import React from "react";


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
