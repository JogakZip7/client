import React, { useState } from 'react';
import './MakeGroup.css';
// import axios from 'axios'; // 데이터 연결 나중에 할 예정이므로 주석 처리
// import Modal from './Modal'; // 모달 관련 기능도 나중에 사용

function MakeGroup() {
    // 상태 변수들 (나중에 사용할 예정이라 주석 처리)
    // const [name, setName] = useState('');
    // const [imageUpload, setImageUpload] = useState(null);
    // const [introduction, setIntroduction] = useState('');
    // const [isPublic, setIsPublic] = useState(true);
    // const [password, setPassword] = useState('');
    // const [showModal, setShowModal] = useState(false);
    // const [message, setMessage] = useState('');

    // const navigate = useNavigate(); // 페이지 이동 관련 코드도 나중에 사용

    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     if (!imageUpload) {
    //         setMessage('이미지를 선택해주세요.');
    //         setShowModal(true);
    //         return;
    //     }
    //     // 나중에 데이터 연결 시 사용할 코드 (주석 처리)
    //     // const groupData = { name, password, imageUrl: "이미지_URL_여기_사용", isPublic, introduction };
    //     // try { ... } catch (error) { ... }
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
    //     navigate('/Group'); // 모달 닫고 다른 페이지로 이동
    // };

    return (
        <div className="App">
            {/* 로고 이미지 */}
            <div className="logo-container">
                <img src="/imgs/logo.png" alt="Logo" className="logo" />
            </div>

            <main className="group-container">
                <h2>그룹 만들기</h2>
                <form>
                    {/* 그룹명 입력 */}
                    <div className="form-group">
                        <label htmlFor="name" className="input-label">그룹명</label>
                        <input
                            type="text"
                            id="name"
                            className="input-box"
                            placeholder="그룹명을 입력하세요"
                            // value={name} // 데이터 연결 나중에 할 예정
                            // onChange={(e) => setName(e.target.value)} // 데이터 연결 나중에 할 예정
                        />
                    </div>

                    {/* 대표 이미지 업로드 */}
                    <div className="form-group">
                        <label htmlFor="imageUpload" className="input-label">대표 이미지</label>
                        <div className="file-upload-container">
                            <input type="file" id="imageUpload" className="file-input" />
                            <label htmlFor="imageUpload" className="file-label">파일 선택</label>
                        </div>
                    </div>

                    {/* 그룹 소개 입력 */}
                    <div className="form-group">
                        <label htmlFor="introduction" className="input-label">그룹 소개</label>
                        <textarea
                            id="introduction"
                            className="textarea-box"
                            placeholder="그룹을 소개해주세요"
                            // value={introduction} // 데이터 연결 나중에 할 예정
                            // onChange={(e) => setIntroduction(e.target.value)} // 데이터 연결 나중에 할 예정
                        />
                    </div>

                    {/* 그룹 공개 여부 토글 스위치 */}
                    <div className="form-group">
                        <label className="input-label">그룹 공개 선택</label>
                        <div className="toggle-container">
                            <div className="toggle-label">공개</div>
                            <div className="toggle-switch">
                                <input type="checkbox" id="isPublic" className="toggle-checkbox" />
                                <label htmlFor="isPublic" className="toggle-slider"></label>
                            </div>
                        </div>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="form-group">
                        <label htmlFor="password" className="input-label">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            className="input-box"
                            placeholder="비밀번호를 입력하세요"
                            // value={password} // 데이터 연결 나중에 할 예정
                            // onChange={(e) => setPassword(e.target.value)} // 데이터 연결 나중에 할 예정
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <button type="submit" className="submit-button">만들기</button>
                </form>

                {/* {showModal && <Modal message={message} onClose={handleCloseModal} />} */}
                {/* 모달 관련 코드도 나중에 사용할 예정 */}
            </main>
        </div>
    );
}

export default MakeGroup;
