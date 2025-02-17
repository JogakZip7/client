import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import mokGroupData from "../../mock/group.json";
import "./GroupDetail.css";

const GroupDetail = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 그룹 데이터를 불러오는 함수
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
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  // ✅ 그룹 데이터가 `null`이거나 `error` 발생 시 `/error` 페이지로 이동
  useEffect(() => {
    if (!loading && (!groupData || error)) {
      console.log("Navigating to /error due to missing data or error...");
      navigate("/error");
    }
  }, [groupData, error, loading, navigate]);

  // ✅ 로딩 중이면 `로딩 중...` 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // ✅ groupData가 null이면 `/error` 페이지로 이동 (보완)
  if (!groupData) {
    console.log("groupData is null, navigating to /error...");
    navigate("/error");
    return null;
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
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
