import items from "../../mock/group.json";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";


function PostListItem({ item }) {
  return (
    <Link to={`/groups/${item.id}`}>
      <div className="PostListItem">
        <img src={item.imageUrl} />
        <div>
          <h1>{item.name}</h1>
          <p>{item.introduction}</p>
        </div>
      </div>
    </Link>
  );
}

function HomePage() {
  return (
    <div>
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <PostListItem item={item} />
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default HomePage;
