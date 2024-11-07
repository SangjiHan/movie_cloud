export function showDetail(value) {
    console.log("show detail");
    console.log(value);

    const floatWindowopen = document.getElementById("floatWindow");
    const floatWindoClose = document.getElementById("floatWindoClose");

    floatWindowopen.style.display = "block";
    floatWindoClose.style.display = "block";
    
    floatWindoClose.addEventListener('click',function(){
        floatWindowopen.style.display = "none";
        floatWindoClose.style.display = "none";
    });

    document.getElementById("movieposter").innerHTML = '';

    document.getElementById("movietitle").innerHTML = '';
    document.getElementById("moviedetailtable").innerHTML = '';
    document.getElementById("movieplot").innerHTML = '';

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmRjYjI1MTdjYmU1OWY4Y2EyOTNlYjgxZjAzZGJkZiIsInN1YiI6IjY1ZjNiNjc3MjkzODM1MDE2NDI4MTdjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4oYDaWnlcZozuXJCLnYKY0QxGpRQA8FfJ8m9G8QqOPk'
        }
    };

const urls =[
    `https://api.themoviedb.org/3/movie/${value}?language=ko`,`https://api.themoviedb.org/3/movie/${value}/credits?language=ko`,`https://api.themoviedb.org/3/movie/${value}/images?`,`https://api.themoviedb.org/3/movie/${value}/videos`,`https://api.themoviedb.org/3/movie/${value}/external_ids`
    ];

const requests = urls.map(url => fetch(url, options).then(response => response.json()));


Promise.all(requests)
    .then(dataArray => {
    const [movieDetails, movieCredit,moviePoster,movieVideo] = dataArray; 

    
    //영화 디테일에서 가져온 정보
    //평점 가져오기 추가하기
    //제목
    const movieTitle = document.createElement('div');
    movieTitle.textContent = movieDetails.title;
    movieTitle.id = "movieTitle";
    document.getElementById("movietitle").appendChild(movieTitle);


    //디테일
    const table = document.createElement('table');

    //감독
    const directors = movieCredit.crew.filter(member => member.job === 'Director');
    const directorName = directors[0].name;

    const directorElement = document.createElement('td');
    directorElement.textContent = directorName;
    
    const row1 = table.insertRow();
    const cell1 = row1.insertCell();
    const cell2 = row1.insertCell();
    cell1.textContent = "감독";
    cell2.appendChild(directorElement);

    //배우
    const movieActors = [];
        for (let i = 0; i < 3; i++) {
            movieActors.push(movieCredit.cast[i].name);
        }
            
    const actors = document.createElement('td')
    actors.textContent = movieActors.join(", ") +" 외";

    const row2 = table.insertRow();
    const cell3 = row2.insertCell();
    const cell4 = row2.insertCell();
    cell3.textContent = "출연";
    cell4.appendChild(actors);

    //개봉일
    const movieReleasedate = document.createElement('td');
    movieReleasedate.textContent = movieDetails.release_date;
    
    const row3 = table.insertRow();
    const cell5 = row3 .insertCell();
    const cell6 = row3.insertCell();
    cell5.textContent = "개봉일";
    cell6.appendChild(movieReleasedate);

    //장르
    const movieGenres = [];
    for (let i = 0; i < movieDetails.genres.length; i++) {
    movieGenres.push(movieDetails.genres[i].name);
    } 
    const genres = document.createElement('td')
    genres.textContent = movieGenres.join(", ");

    const row4 = table.insertRow();
    const cell7 = row4.insertCell();
    const cell8 = row4.insertCell();
    cell7.textContent = "장르";
    cell8.appendChild(genres);


    //상영시간
    const movieRunTime = document.createElement('td');
    movieRunTime.textContent = movieDetails.runtime + " 분";

    const row5 = table.insertRow();
    const cell9 = row5.insertCell();
    const cell10 = row5.insertCell();
    cell9.textContent = "상영시간";
    cell10.appendChild(movieRunTime);

    //평점
    const movieRank = document.createElement('td');
    movieRank.textContent = movieDetails.vote_average;

    const row6 = table.insertRow();
    const cell11 = row6.insertCell();
    const cell12 = row6.insertCell();
    cell11.textContent = "평점";
    cell12.appendChild(movieRank);


    document.getElementById("moviedetailtable").appendChild(table);
        

    //줄거리
    const movieplot = document.createElement('p');
    movieplot.textContent = movieDetails.overview;

    document.getElementById("movieplot").appendChild(movieplot);

   
    //포스터
    const movieImage = document.getElementById("movieposter")
    console.log(movieImage);

    const posterlink = moviePoster.posters[0].file_path;
    const movieposter_image = document.createElement('img');
    movieposter_image.src = 'https://image.tmdb.org/t/p/w500' + posterlink;
    
    movieposter_image.style.height = '500px';
    movieImage.appendChild(movieposter_image);
        
      

    
});
};

