import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import mokGroupData from "../../mock/group.json";
import mokPostData from "../../mock/post.json";
import "./GroupDetail.css";
import FlowerIcon from "../../assets/Flower.png";
import ChatIcon from "../../assets/Chat.png";
import EmptyIcon from "../../assets/empty.png";

const GroupDetail = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userfollowGroup, setUserFollowGroup] = useState([]);
  const [isPublicSelected, setIsPublicSelected] = useState(true);
  const [hasFetchedPosts, setHasFetchedPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  //그룹 데이터를 불러오는 함수
  const fetchGroupData = useCallback(async () => {
    try {
      console.log("Fetching group data for groupId:", groupId);
      const group = mokGroupData.find((data) => String(data.id) === groupId);

      if (!group) {
        throw new Error("그룹 정보를 찾을 수 없습니다.");
      }

      setGroupData({
        name: group.name,
        imageUrl: group.imageUrl,
        introduction: group.introduction,
        followCount: group.followCount,
        postCount: group.postCount,
        createdAt: group.createdAt,
        badges: group.badges,
      });
      console.log("Group data successfully loaded:", group);
      await fetchPosts();
      setHasFetchedPosts(true);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groupId, navigate]);

  const fetchPosts = async () => {
    try {
      // API 요청 부분 주석 처리
      // const postResponse = await api.get(`/groups/${groupId}/posts`, {
      //   params: {
      //     page: currentPage,
      //     pageSize: 10,
      //     sortBy: sortBy,
      //     keyword: searchTerm,
      //     isPublic: isPublicSelected
      //   }
      // });

      // 해당 그룹의 게시글을 post.json에서 찾아 필터링
      const posts = mokPostData.filter(
        (post) => String(post.groupId) === groupId
      );

      // 필요한 페이징, 정렬, 필터링 처리 (더미 데이터 예시)
      const filteredPosts = posts.filter((post) => {
        return (
          isPublicSelected === undefined || post.isPublic === isPublicSelected
        );
      });

      setPosts(filteredPosts); // 상태 업데이트

      const postResponse = {
        data: filteredPosts,
        totalPages: Math.ceil(filteredPosts.length / 10), // 예시로 10개씩 페이지네이션
      };

      // 결과 처리
      return postResponse;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  // ✅ 그룹 데이터가 `null`이거나 `error` 발생 시 `/error` 페이지로 이동
  useEffect(() => {
    if (hasFetchedPosts) {
      fetchPosts();
    }
  }, [currentPage, sortBy, isPublicSelected]);

  //팔로우,언팔로우 기능
  const followGroup = async () => {
    try {
      const isAlreadyFollowed = userfollowGroup.includes(groupId);

      if (isAlreadyFollowed) {
        // 이미 팔로우 한 상태라면 언팔로우 처리
        setUserFollowGroup((prev) => prev.filter((id) => id !== groupId));
        setGroupData((prevData) => ({
          ...prevData,
          followCount: prevData.followCount - 1,
        }));
        alert("그룹에서 탈퇴했어요. 언제든 다시 돌아오세요! 😢");
      } else {
        // 팔로우하지 않은 상태라면 팔로우 처리
        setUserFollowGroup((prev) => [...prev, groupId]);
        setGroupData((prevData) => ({
          ...prevData,
          followCount: prevData.followCount + 1,
        }));
        alert("그룹에 가입했어요! 함께 즐겨봐요 😊");
      }
    } catch (error) {
      alert("그룹 가입/탈퇴 처리에 실패했습니다.");
    }
  };

  const badgeInfo = {
    "게시글 20개 등록": { icon: "👾", name: "게시글 20개 등록" },
    "그룹 인원수 10명 달성": { icon: "🌼", name: "그룹 인원수 10명 달성" },
    "게시글 공감 20개 이상 받기": {
      icon: "💖",
      name: "게시글 공감 20개 이상 받기",
    },
  };

  const renderBadge = (badgeName) => {
    const isAcquired = groupData.badges.includes(badgeName);
    console.log(
      `Badge ${badgeName}: ${isAcquired ? "Acquired" : "Not Acquired"}`
    );
    return (
      <div
        key={badgeName}
        className={`badge ${isAcquired ? "acquired" : "not-acquired"}`}
      >
        <span className="badge-icon">{badgeInfo[badgeName].icon}</span>
        <span className="badge-name">{badgeInfo[badgeName].name}</span>
      </div>
    );
  };

  // 로딩 중이면 `로딩 중...` 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // groupData가 null이면 `/error` 페이지로 이동
  if (!groupData) {
    console.log("groupData is null, navigating to /error...");
    navigate("/error");
    return null;
  }

  return (
    <div className="group-detail-container">
      <div className="group-header">
        <img
          src={groupData.imageUrl}
          alt={groupData.name}
          className="group-img"
        />
        <div className="group-info">
          <Link to={`/groups/${groupId}`}>
            <button className="edit-delete-btn">그룹 수정/삭제</button>
          </Link>

          <div className="group-name-stats">
            <h1 className="group-detail-title">{groupData.name}</h1>
            <div className="group-stats-inline">
              <span>추억 {groupData.postCount}</span>
              <div className="v-line"></div>
              <span>그룹 인원 수 {groupData.followCount.toLocaleString()}</span>
            </div>
          </div>
          <p className="group-description">{groupData.introduction}</p>

          <div className="group-badge-and-follow">
            <div className="group-badges">
              <h3>획득 배지</h3>
              <div className="badges-list">
                {Object.keys(badgeInfo).map(renderBadge)}
              </div>
            </div>
            <button className="follow-btn" onClick={followGroup}>
              <img src="/imgs/fav_size=32_32.png" alt="가입/탈퇴 아이콘" />
              {userfollowGroup.includes(groupId)
                ? "그룹 탈퇴하기"
                : "그룹 가입하기"}
            </button>
          </div>
        </div>
      </div>
      <div className="post-section">
        <div className="post-header">
          <h3>추억 목록</h3>
          <Link to={`/groups/${groupId}/posts`}>
            <button className="post-upload-btn">
              추억 올리기
            </button>
          </Link>
        </div>

        <div className="post-controls">
          <div className="privacy-toggle">
            <button
              className={`public-btn ${isPublicSelected ? "active" : ""}`}
              onClick={() => setIsPublicSelected(true)}
            >
              공개
            </button>
            <button
              className={`private-btn ${!isPublicSelected ? "active" : ""}`}
              onClick={() => setIsPublicSelected(false)}
            >
              비공개
            </button>
          </div>
          <select
            className="post-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="likes">공감순</option>
            <option value="latest">최신순</option>
          </select>
        </div>

        {/* 게시글 목록 렌더링 */}
        {posts.length === 0 ? (
          <div className="empty-post">
            <img src={EmptyIcon} alt="게시물 없음" className="empty-icon" />
            <p className="no-results">게시된 추억이 없습니다.</p>
            <p className="upload-first-post">첫 번째 추억을 올려보세요!</p>
          </div>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}/details`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`post-card post-item ${
                    post.isPublic ? "public" : "private"
                  }`}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-img"
                  />
                  <div className="post-info">
                    <div className="post-meta">
                      <span className="group-name">{post.nickname}</span>
                      <div className="post-v-line"></div>
                      <span className="public-status">
                        {post.isPublic ? "공개" : "비공개"}
                      </span>
                    </div>
                    <h4 className="post-card-title">{post.title}</h4>
                    <p className="post-tags">
                      {post.tags
                        ? post.tags.map((tag) => `#${tag}`).join(" ")
                        : ""}
                    </p>
                    <div className="post-footer">
                      <div className="post-location">
                        <span>{post.location}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="post-stats">
                        <span>
                          <img
                            src={FlowerIcon}
                            alt="공감"
                            className="flower-chat-icon"
                          />{" "}
                          {post.likeCount}
                        </span>
                        <span>
                          <img
                            src={ChatIcon}
                            alt="댓글"
                            className="flower-chat-icon"
                          />{" "}
                          {post.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
