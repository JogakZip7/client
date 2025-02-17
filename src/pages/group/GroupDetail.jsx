import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import mokGroupData from "../../mock/group.json";
import "./GroupDetail.css";

const GroupDetail = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [groupData, setGroupData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userfollowGroup, setUserFollowGroup] = useState([]);
  const [isPublicSelected, setIsPublicSelected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetchedPosts, setHasFetchedPosts] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  const fetchGroupData = useCallback(async () => {
    try {
      // API 요청 부분 주석 처리
      // const groupResponse = await api.get(`/groups/${groupId}`);
      // console.log("Group response:", groupResponse.data);
      const group = mokGroupData.find((data) => String(data.id) === groupId);
      if (group) {
        setGroupData({
          name: group.name,
          imageUrl: group.imageUrl,
          introduction: group.introduction,
          followCount: group.followCount,
          postCount: group.postCount,
          createdAt: group.createdAt,
          badges: group.badges,
        });
        console.log(group);
      }

      // Fetch posts
      await fetchPosts();

      setHasFetchedPosts(true);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("데이터를 불러오는 중 문제가 발생했습니다.");
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

      // 대신 더미 데이터로 테스트
      const postResponse = {
        data: [
          { id: 1, title: "공개 글 1", isPublic: true },
          { id: 1, title: "비공개 글 1", isPublic: false },
          { id: 2, title: "공개 글 2", isPublic: true },
          { id: 2, title: "비공개 글 2", isPublic: false },
        ],
        totalPages: 1,
      };

      console.log("Post response:", postResponse.data);

      // 게시글 공개 여부에 맞는 데이터 필터링
      const filteredPosts = postResponse.data.filter(
        (post) => post.isPublic === isPublicSelected
      );
      setPosts(filteredPosts);
      setTotalPages(postResponse.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

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

  /*const handleEditGroup = () => {
    navigate(`/groups/${groupId}`);
  };

  const handleDeleteGroup = () => {
    navigate(`/groups/${groupId}`);
  };*/

  const handleCreatePostClick = () => {
    navigate(`/groups/${groupId}/posts`);
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!groupData) {
    return <div>그룹 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="group-detail-container">
      <div className="group-header">
        <img
          src={groupData.imageUrl || "/default-group.png"}
          alt={groupData.name}
          className="group-img"
        />
        <div className="group-info">
          <button className="edit-delete-btn">그룹 수정/삭제</button>

          <div className="group-name-stats">
            <h1 className="group-detail-title">{groupData.name}</h1>
            <div className="group-stats-inline">
              <span>추억 {groupData.postCount}</span>
              <div className="v-line"></div>
              <span>그룹 인원 수 {groupData.followCount.toLocaleString()}</span>
            </div>
          </div>
          <p className="group-description">{groupData.introduction}</p>

          <div className="group-badge-and-like">
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
          <button className="post-upload-btn" onClick={handleCreatePostClick}>
            추억 올리기
          </button>
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
        <div className="post-list">
          {posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className={`post-item ${post.isPublic ? "public" : "private"}`}
              >
                <h4>{post.title}</h4>
                <span>{post.isPublic ? "공개" : "비공개"}</span>
              </div>
            ))
          )}
        </div>

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