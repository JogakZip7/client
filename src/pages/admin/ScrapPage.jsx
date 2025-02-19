import styles from "./ScrapPage.module.css";
import myscrap from "../../mock/scrap.json";
import items from "../../mock/post.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ScrapPage() {
  const [userId, setUserId] = useState(null);
  const [userScrap, setUserScrap] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id"); // localStorage에서 userId 가져오기
    setUserId(storedUserId);

    if (storedUserId) {
      // 유저의 스크랩 데이터를 찾기
      const userScrapEntry = myscrap.find(
        (entry) => entry.userId === storedUserId
      );

      if (userScrapEntry) {
        const postIds = userScrapEntry.postId; // 유저가 스크랩한 postId 배열 가져오기

        // 해당 유저가 스크랩한 포스트만 필터링
        const filteredScrapPosts = items.filter((item) =>
          postIds.includes(item.id)
        );
        setUserScrap(filteredScrapPosts);
      }
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>스크랩한 글 모아보기</h1>
      </div>
      <ul className={styles.list}>
        {userScrap.length > 0 ? (
          userScrap.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className={styles.listItem}
            >
              <img src={post.imageUrl} alt={post.title} />
              <div className={styles.textContainer}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>스크랩한 글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default ScrapPage;
