import { showDetail } from "./showDetail";

export function showList(value) {
    console.log(value);
    const homeArea = document.getElementById("homeArea");
    homeArea.style.display = "none";

    const nowplaying = document.getElementById("nowplaying");
    const home = document.getElementById("home");
    const popular = document.getElementById("popular");
    const toprated = document.getElementById("toprated");
    const upcoming = document.getElementById("upcoming");

    // Reset all tab colors
    nowplaying.style.color = "white";
    home.style.color = "white";
    popular.style.color = "white";
    toprated.style.color = "white";
    upcoming.style.color = "white";

    // Set color based on the value
    switch (value) {
        case 'now_playing':
            nowplaying.style.color = "rgb(93, 140, 241)";
            break;
        case 'home':
            home.style.color = "rgb(93, 140, 241)";
            break;
        case 'popular':
            popular.style.color = "rgb(93, 140, 241)";
            break;
        case 'top_rated':
            toprated.style.color = "rgb(93, 140, 241)";
            break;
        case 'upcoming':
            upcoming.style.color = "rgb(93, 140, 241)";
            break;
        default:
            // Handle default case if needed
            break;
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmRjYjI1MTdjYmU1OWY4Y2EyOTNlYjgxZjAzZGJkZiIsIm5iZiI6MTcxOTA1ODI3Ni40Mzk4NTIsInN1YiI6IjY1ZjNiNjc3MjkzODM1MDE2NDI4MTdjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xED7bzatcaAQZolQILJNXvTOu7FuFx8PIes1lf3ngIY'
        }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${value}?language=ko&page=1`, options)
        .then(response => response.json())
        .then(data => {
            const showListTotal = document.createElement("ul");
            showListTotal.id ="showListUl";
                
            data.results.forEach((movie, index) => {
                const showListItem = document.createElement("li");
                showListItem.id = "showListLi";

                const showListImg = document.createElement("img");
                showListImg.src = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
                showListImg.style.width = "250px";

                const showListTitle = document.createElement("div");
                showListTitle.textContent = movie.title;
                showListTitle.id = "showListTitle";

                const moreLinkDiv = document.createElement("div");
                moreLinkDiv.id = "more";

                const moreLink = document.createElement("a");
                moreLink.id = "movieDetail";
                moreLink.href = "#floatWindow";
                moreLink.id = "openwindow";
                moreLink.textContent = "자세히보기";

                moreLinkDiv.value = movie.id

                moreLink.setAttribute("data-movie-id", movie.id); 
                moreLinkDiv.appendChild(moreLink)

                showListItem.appendChild(showListImg);
                showListItem.appendChild(showListTitle);
                showListItem.appendChild(moreLinkDiv);
                showListTotal.appendChild(showListItem);
                moreLinkDiv.addEventListener('click', function() {
                    const movieId = moreLinkDiv.value;
                    showDetail(movieId); 
                });
                
            });



            const showListContent = document.getElementById("showListView");
            showListContent.innerHTML = '';
            showListContent.appendChild(showListTotal);

            const lis = showListTotal.querySelectorAll("li");
                lis.forEach((item, index) => {
                    if (index < 12) {
                    item.style.cssText = "display:inline-block; opacity:0;";
                    fadeInItem(item, index);
                    } else {
                    item.style.display = "none";
                    }
                });

                function fadeInItem(item, index) {
                    setTimeout(function() {
                    item.style.opacity = 1;
                    item.style.animation = "fadeInDown 2s";
                    }, index * 300);
                }

                var moreButton = document.createElement("button");
                moreButton.id = "moreBtn"
                moreButton.innerHTML = "더보기";
                showListContent.appendChild(moreButton); 
                
                var listcount = document.createElement("div");
                var allcount = document.createElement("span");
                allcount.innerHTML = ' / ' + lis.length;

                listcount.id = "list_count";
                

                var nowcount = document.createElement("span");
                if(lis.length < 12) {
                    nowcount.innerHTML = lis.length;
                } else {
                    nowcount.innerHTML = 12;
                }
                
                moreButton.addEventListener("click", function() { 
                    var moreshow = 0;
                
                    for (var i = 0; i < lis.length; i++) {
                    if (lis[i].style.display !== "none") {
                        moreshow++;
                    }
                    }
                
                    for (var j = moreshow; j < moreshow + 12 && j < lis.length; j++) {
                        lis[j].style.cssText = "display:inline-block; opacity:0;"; 
                        fadeInItem(lis[j], j%12);
                        if (moreshow + 12 <lis.length) {
                        nowcount.innerHTML = 12 + moreshow;
                        }
                        else{
                        nowcount.innerHTML = lis.length;
                        }
                    }


                    if (moreshow === lis.length) {
                        moreButton.style.display = "none";
                        alert("목록이 없습니다.");
                    }

                    
                });

                listcount.appendChild(nowcount);
                listcount.appendChild(allcount);
                showListContent.appendChild(listcount);
             
        }) 
        .catch(err => console.error(err));
}