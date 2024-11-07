export function showHome() {
    console.log("homepage");

    const nowplaying = document.getElementById("nowplaying");
    const home = document.getElementById("home");
    const popular = document.getElementById("popular");
    const toprated = document.getElementById("toprated");
    const upcoming = document.getElementById("upcoming");

    nowplaying.style.color = "white";
    home.style.color = "rgb(93, 140, 241)";
    popular.style.color = "white";
    toprated.style.color = "white";
    upcoming.style.color = "white";

    const homeArea = document.getElementById("homeArea");
    console.log(homeArea);
    homeArea.style.backgroundColor = "black";
    homeArea.style.display = "block";


    const showList = document.getElementById("showListView");
    showList.innerHTML = '';



    const titleHomepage = document.createElement("div");
    titleHomepage.id = "titleHomepage";
    titleHomepage.innerHTML = "MoiveCloud";

    const infoHome = document.createElement("div");
    infoHome.id = "infoHome";
    infoHome.innerHTML = "영화 정보 제공 사이트 입니다. <br> 현재 상영작, 인기 영화, 최고 평점, 개봉 예정영화를 볼 수 있습니다. <br>영화 상세보기를 통해 영화 정보를 확인하세요!";

    homeArea.appendChild(titleHomepage);
    homeArea.appendChild(infoHome);
}