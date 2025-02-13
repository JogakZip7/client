import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <nav>
            <ul>
                <li><Link to="/post">게시판</Link></li>
                <li><Link to="/error">에러</Link></li>
            </ul>
        </nav>
    );
  }

  export default HomePage;