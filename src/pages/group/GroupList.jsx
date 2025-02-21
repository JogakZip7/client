import React, { useState, useEffect } from "react";
import items from "../../mock/group.json";
import { Link } from "react-router-dom";
import mygroup from "../../mock/participate.json";
import styles from "./GroupList.module.css";

function GroupListItem({ item }) {
  return (
    <Link to={`/groups/${item.id}/details`}>
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

function GroupList() {
  const [userGroups, setUserGroups] = useState([]);
  const [userId, setUserId] = useState(null);

  // 페이지가 로드될 때, localStorage에서 userId를 가져옵니다.
  useEffect(() => {
    const storedUserId = localStorage.getItem("id"); // localStorage에서 userId 가져오기
    setUserId(storedUserId);
    if (storedUserId) {
      // 유저의 참여 그룹만 필터링
      const userParticipation = mygroup.find(
        (entry) => entry.userId === storedUserId
      );

      if (userParticipation) {
        const groupIds = userParticipation.groupId;

        // 해당 유저가 참여한 그룹들의 데이터만 필터링
        const userGroups = items.filter((item) => groupIds.includes(item.id));
        setUserGroups(userGroups);
      }
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.title}>우리는 7942~ ₊·*◟(⌯ˇ- ˇ⌯)◜‧*・</div>
      {userGroups.length > 0 ? (
        <ul className={styles.container}>
          {userGroups.map((item) => (
            <li key={item.id}>
              <GroupListItem item={item} />
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
