import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <nav>
            <ul>
                <li><Link to="/page">게시판</Link></li>
            </ul>
        </nav>
    );
  }

  export default HomePage;