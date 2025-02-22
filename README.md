# **🔉프로젝트 소개**

코드잇부스트 1기 2반 데모데이의 프로젝트 주제인 **조각집**으로, 사진 공유 방식의 커뮤니티 웹 서비스 입니다.

### ⭐제시된 요구사항과 차별화된 점

회원가입 및 로그인 기능을 추가하여 스크랩한 게시글 및 속한 그룹들을 한 눈에 볼 수 있도록 하였으며, 메인페이지를 따로 만들어 다른 그룹들의 공유 게시글들을 자유롭게 둘러볼 수 있는 커뮤니티의 기능을 강화하였습니다.

# 🚩페이지 및 기능 소개
### 메인

다른 그룹들의  목록을 제공하여 그룹 간 소통을 활성화 시킬 수 있습니다.

### 그룹페이지

그룹의 

### 게시글 상세

참여하고 있는 그룹에서 게시글과 사진을 자유롭게 작성할 수 있도록 하였고, 댓글 기능과 공감버튼을 통해 개인의 추억을 공유하고 공감할 수 있습니다.

### 마이페이지

마이페이지에서 유저가 스크랩한 게시글들 및 참여하고 있는 그룹들을 모아볼 수 있도록 개인화된 공간을 만들었습니다.

### 로그인 / 회원가입

회원가입과 로그인 기능을 추가하여 프라이빗한 서비스를 제공합니다. 또한 그룹 및 게시글 수정삭제 시에 받는 불필요한 비밀번호 데이터를 삭제하여, DB관리에 용이하게 됨
# 👩🏻‍💻 팀원소개
| 신수진 | 양서현 | 김가은 | 박서현 |
| --- | --- | --- | --- |
| @lemoncurdyogurt | @SeoooooooooooHyun | @gaeun-dev | @donut74 |

# **🛠**기술 스택

| **역할** | **종류** |
| --- | --- |
| Framework | <img src="https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=Java&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=Java&logoColor=white">|
| Styling | <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> |
| Programming Language | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> |
| Formatting | <img src="https://img.shields.io/badge/prettier-F7B93E?style=flat-square&logo=styled-components&logoColor=white"/> |
| Package manager | <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=styled-components&logoColor=white"/>|
| Version control | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> |

# 📂 폴더 구조
```
📦public
 ┣ 📂imgs
 ┃ ┣ 📜fav_size=16_16.png
 ┃ ┣ 📜fav_size=32_32.png
 ┃ ┣ 📜fav_size=64_64.png
 ┃ ┣ 📜image=img1.png
 ┃ ┣ 📜image=img2.png
 ┃ ┣ 📜image=img3.png
 ┃ ┣ 📜image=img4.png
 ┃ ┣ 📜image=img5.png
 ┃ ┗ 📜logo.png
 ┗ 📜login.json
 📦src
 ┣ 📂api
 ┃ ┣ 📜axiosInstance.jsx
 ┃ ┣ 📜GroupAPI.jsx
 ┃ ┣ 📜ImagePostAPI.jsx
 ┃ ┣ 📜LoginAPI.jsx
 ┃ ┣ 📜PostAPI.jsx
 ┃ ┗ 📜SignUpAPI.jsx
 ┣ 📂assets
 ┃ ┣ 📜badge=groupnum.png
 ┃ ┣ 📜badge=post.png
 ┃ ┣ 📜badge=postheart.png
 ┃ ┣ 📜Chat.png
 ┃ ┣ 📜empty.png
 ┃ ┣ 📜error.png
 ┃ ┣ 📜Flower.png
 ┃ ┣ 📜like.png
 ┃ ┣ 📜mypagebutton.png
 ┃ ┣ 📜Pen.png
 ┃ ┣ 📜state=active.png
 ┃ ┣ 📜state=default.png
 ┃ ┗ 📜Trash.png
 ┣ 📂components
 ┃ ┣ 📜appFont.css
 ┃ ┣ 📜Navbar.jsx
 ┃ ┗ 📜Navbar.module.css
 ┣ 📂mock
 ┃ ┣ 📜group.json
 ┃ ┣ 📜participate.json
 ┃ ┣ 📜post.json
 ┃ ┗ 📜scrap.json
 ┣ 📂pages
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜LoginPage.jsx
 ┃ ┃ ┣ 📜LoginPage.module.css
 ┃ ┃ ┣ 📜ScrapPage.jsx
 ┃ ┃ ┣ 📜ScrapPage.module.css
 ┃ ┃ ┣ 📜SignUpPage.jsx
 ┃ ┃ ┗ 📜SignUpPage.module.css
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜ErrorPage.jsx
 ┃ ┃ ┗ 📜ErrorPage.module.css
 ┃ ┣ 📂group
 ┃ ┃ ┣ 📜EditGroup.css
 ┃ ┃ ┣ 📜EditGroup.jsx
 ┃ ┃ ┣ 📜GroupDetail.css
 ┃ ┃ ┣ 📜GroupDetail.jsx
 ┃ ┃ ┣ 📜GroupList.jsx
 ┃ ┃ ┣ 📜GroupList.module.css
 ┃ ┃ ┣ 📜MakeGroup.css
 ┃ ┃ ┗ 📜MakeGroup.jsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜HomePage.css
 ┃ ┃ ┗ 📜HomePage.jsx
 ┃ ┗ 📂post
 ┃ ┃ ┣ 📜EditPost.css
 ┃ ┃ ┣ 📜EditPost.jsx
 ┃ ┃ ┣ 📜MakePost.css
 ┃ ┃ ┣ 📜MakePost.jsx
 ┃ ┃ ┣ 📜Postpage.jsx
 ┃ ┃ ┗ 📜PostPage.module.css
 ┣ 📜.env
 ┣ 📜index.jsx
 ┣ 📜main.jsx
 ┣ 📜Modal.css
 ┗ 📜Modal.jsx
```

