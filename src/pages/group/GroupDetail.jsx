import items from "../../mock/group.json";
import {React, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";


function GroupItem() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const group = items.find((g) => g.id === parseInt(id));

  useEffect(() =>{
    if(!group){
     navigate("/error");
    }
  },[group, navigate]);

  if (!group) return null; // 리다이렉트 되므로 화면 출력 없음

  return (
    <div className="GroupItem">
      <img src={group.imageUrl} />
      <div>
        <h1>{group.name}</h1>
        <p>{group.introduction}</p>
      </div>
    </div>
  );
}

export default GroupItem;
