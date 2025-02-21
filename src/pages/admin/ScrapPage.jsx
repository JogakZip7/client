import { useState, useEffect } from "react";
import { getMyScrapPosts } from "../../api/ScrapApi";
import { Link } from "react-router-dom";
import styles from "./ScrapPage.module.css";

function ScrapPage() {
  const [scrapPosts, setScrapPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScrapPosts = async () => {
      try {
        const data = await getMyScrapPosts();
        //console.log("스크랩한 게시글 데이터:", data);

        // data.data에서 배열 추출
        setScrapPosts(data.data || []);
      } catch (err) {
        console.error("Error loading scrap posts:", err);
        setError("스크랩한 게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchScrapPosts();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (scrapPosts.length === 0) return <p>스크랩한 게시물이 없습니다.</p>;

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>당신! 추억 수집가군요? (*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ</h1>
      </div>
      <ul className={styles.list}>
        {scrapPosts.map((post) => (
          <Link
            to={`/posts/${post.id}/details`}
            key={post.id}
            className={styles.listItem}
          >
            <img src={post.imageUrl} alt={post.title} />
            <div className={styles.textContainer}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ScrapPage;
