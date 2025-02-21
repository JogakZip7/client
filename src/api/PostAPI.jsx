import axiosInstance from './axiosInstance';

// 게시물 등록
export const createPost = async (groupId, postData) => {
  try {
    const response = await axiosInstance.post(`/groups/${groupId}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error; // 에러를 던져서 호출한 곳에서 처리하도록
  }
};

// 게시물 목록 조회
export const fetchPosts = async (groupId) => {
  try {
    const response = await axiosInstance.get(`/groups/${groupId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 특정 게시물 조회
export const fetchPostById = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// 게시물 수정
export const updatePost = async (postId, postData) => {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// 게시물 삭제
export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// 게시물 상세 정보 조회
export const fetchPostDetails = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
};

// 게시물 좋아요
export const likePost = async (postId) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// 게시물 공개 여부 확인
export const checkPostPublic = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}/is-public`);
    return response.data;
  } catch (error) {
    console.error("Error checking post public status:", error);
    throw error;
  }
};
