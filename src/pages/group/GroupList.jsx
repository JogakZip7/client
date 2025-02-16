import items from "../../mock/group.json";
import { Link } from "react-router-dom";
import mygroup from "../../mock/participate.json";

function ParticipateGroup({mygroup}){
  
}
function GroupList() {
  return(
    <ul>
      <h2>내가 속한 그룹</h2>
      {items.map((item) => ( // map()을 {}로 감싸기
        <li key={item.id}>
          <img src={item.imageUrl}/>
          <br />
          <Link to={`/groups/${item.id}`}>{item.name}</Link> 
          <br />
          <br />
        </li>
      ))}
    </ul>
  );
}

export default GroupList;
