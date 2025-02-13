import items from "../../mock/group.json";
//import { Link } from "react-router-dom";

function GroupList() {
  return items.map((item) => {
    return (
      <li>
        {item.name}
      </li>
    );
  });
}

export default GroupList;
