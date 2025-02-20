import items from "../../mock/group.json";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

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
      <div className="page">
        <div className="title">조각집에 잘 오셨어요! 방문 추천 그룹들이에요(*´▽`*)</div>
        <ul className="container">
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
