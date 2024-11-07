import React, { useState, useEffect } from 'react';
import './App.css';
import { showList } from './component/showList.js';
import { showHome } from './component/showHome.js';

import './style/showList.css'; 
import './style/floatwindow.css';
import './style/homearea.css';

import closeImage from './image/close.png';


function App() {
  useEffect(() => {
    showHome();
  }, []); 


  return (
    <div id="Total">
      <div className="tab_area">
        <ul id="tabList">
          <li id="home" onClick={() => showHome()}> 홈 </li>
          <li id="nowplaying" onClick={() => showList('now_playing')}> 현재 상영작 </li>
          <li id="popular" onClick={() => showList('popular')}> 인기 영화 </li>
          <li id="toprated" onClick={() => showList('top_rated')}> 최고 평점 </li>
          <li id="upcoming" onClick={() => showList('upcoming')}> 개봉예정영화 </li>
        </ul>
      </div>

      <div id="homeArea">

      </div>

      <div className="showList">
        <div id="showListView"> </div>
      </div>

      <div id="floatWindoClose">
        <img src={closeImage} alt="닫힘" width="30px" />
      </div>

      <div id="floatWindow"> 
        <dl>
          <dt></dt>
          <dd>

            <div id="overview">
              <div id="movieposter">
                
                
              </div>
              <div id="moviedetails">
                <div id="movietitle">영화 제목</div>
                <div id="moviedetailtable">영화 세부 정보</div>
                <div id="movieplot">영화 줄거리</div>
  
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default App;