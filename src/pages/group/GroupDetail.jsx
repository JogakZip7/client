import items from "../../mock/group.json";
import React from "react";



function GroupItem({ item }) {
  return (
    <div className="GroupItem">
      <img src={item.imageUrl} />
      <div>
        <h1>{item.name}</h1>
        <p>{item.introduction}</p>
      </div>
    </div>
  );
}

export default GroupItem;
