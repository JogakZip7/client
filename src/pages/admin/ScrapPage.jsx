import styles from "./ScrapPage.module.css";
import myscrap from "../../mock/scrap.json";
import group from "../../mock/group.json";
import items from "../../mock/post.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FindGroupName = (postId, posts, groups) => {
  const post = posts.find((p) => p.id === postId);
  if (!post) return null; // 포스트가 없으면 null 반환

  const group = groups.find((g) => g.id === post.groupId);
  return group ? group.name : null; // 그룹 이름 반환, 없으면 null
};

function ScrapPage() {
  const [userId, setUserId] = useState(null);
  const [userScrap, setUserScrap] = useState([]);

  const [groups, setGroups] = useState([]); // 그룹 데이터를 저장
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 여기서 실제 API 호출로 데이터를 가져옵니다.
  //       const groupsResponse = await axios.get('/api/groups');
  //       const postsResponse = await axios.get('/api/posts');
        
  //       setGroups(groupsResponse.data);
  //       setPosts(postsResponse.data);
  //     } catch (error) {
  //       console.error('데이터 로드 오류:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // // 특정 postId로 그룹 이름 찾기
  // const FindGroupName = (postId) => {
  //   const post = posts.find((p) => p.id === postId);
  //   if (!post) return null; // 포스트가 없으면 null 반환

  //   const group = groups.find((g) => g.id === post.groupId);
  //   return group ? group.name : null; // 그룹 이름 반환, 없으면 null
  // };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>당신! 추억 수집가군요? (*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ</h1>
      </div>
      <ul className={styles.list}>
        {userScrap.length > 0 ? (
          userScrap.map((post) => (
            <Link
              to={`/post/${post.id}/details`}
              key={post.id}
              className={styles.listItem}
            >
              <img src={post.imageUrl} alt={post.title} />
              <div className={styles.textContainer}>
                <p>{FindGroupName(post.id, items, group)}</p>
                <br/>
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
