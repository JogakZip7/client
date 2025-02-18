import React, { useState, useEffect } from "react";
import items from "../../mock/group.json";
import { Link } from "react-router-dom";
import mygroup from "../../mock/participate.json";

function GroupList() {
  const [userGroups, setUserGroups] = useState([]);
  const [userId, setUserId] = useState(null);

  // 페이지가 로드될 때, localStorage에서 userId를 가져옵니다.
  useEffect(() => {
    const storedUserId = localStorage.getItem("id"); // localStorage에서 userId 가져오기
    setUserId(storedUserId);
    if (storedUserId) {
      // 유저의 참여 그룹만 필터링
      const userParticipation = mygroup.find((entry) => entry.userId === storedUserId);
      
      if (userParticipation) {
        const groupIds = userParticipation.groupId;
        
        // 해당 유저가 참여한 그룹들의 데이터만 필터링
        const userGroups = items.filter((item) => groupIds.includes(item.id));
        setUserGroups(userGroups);
      }
    }
  }, []);

  return (
    <div>
      <h2>내가 속한 그룹</h2>
      {userGroups.length > 0 ? (
        <ul>
          {userGroups.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <br />
              <Link to={`/groups/${item.id}`}>{item.name}</Link>
              <br />
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>가입한 그룹이 없습니다.</p>
      )}
    </div>
  );
}

export default GroupList;
