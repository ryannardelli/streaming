const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    },

    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: 2000, // tempo em milissegundos entre cada rolagem
        disableOnInteraction: false, // para continuar o autoplay mesmo se o usuário interagir com o swiper
    },
});


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQ3NWFlZGZlODQyZTg5OGZhM2RhMTU5MWZhM2YwMSIsInN1YiI6IjY2MTMxMDRkMjgzZWQ5MDE2MjFkMWY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2QIie_En542SCmRXmSq-W3ohjTV38SlRE91OchVRrr4'
    }
};


function createIframe() {
    const iframe = document.createElement('iframe');
    return iframe;
}

// Armazenar referências para elementos DOM frequentemente acessados
const elements = {
    containerMovie: document.querySelector('.container_movie'),
    containerSerie: document.querySelector('.container_serie'),
    iframe_video: document.querySelector('.iframe-video'),
    btn_watch_trailer: document.querySelector('#btn-watch-trailer'),
    container_iframe: document.querySelector('.iframe-container'),
    close_button: document.querySelector('.btn-close'),
    swiperWrapper: document.querySelector('.swiper-wrapper'),
    titleOfMovie: document.querySelector('.title_movie'),
    OverviewAboutMovie: document.querySelector('.overview-about-movie'),
    dateMovie: document.querySelector('.date_movie'),
    vote: document.querySelector('.vote'),
    genreOne: document.querySelector('.genre_one'),
    genreTwo: document.querySelector('.genre_two'),
    posterImg: document.querySelector('.poster_img'),
    containerAboutSerie: document.querySelector('.container_about_serie'),
    containerAvalationSerie: document.querySelector('.avaliation_serie'),
    section_movies_description: document.querySelector('.container-movies-description'),
    containerLogo: document.querySelector('.container-logo'),
    input_search: document.querySelector('#input_search'),
    iconSearch: document.querySelector('#icon_search'),
    apiKey: 'df475aedfe842e898fa3da1591fa3f01',
    url_youtube: 'https://www.youtube.com/embed/',
};

function insertIframe(src) {
    const iframe = createIframe();
    iframe.src = src;
    iframe.width = '560';
    iframe.height = '315';
    iframe.style.border = 'none';
    elements.iframe_video.appendChild(iframe);
    return elements.iframe_video;
}

function createImg(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}

function createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
}

function insertSlide(src, alt) {
    const slide = createDiv('swiper-slide');
    slide.appendChild(createImg(src, alt));
    elements.swiperWrapper.appendChild(slide);
}

async function fetchApi(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch(e) {
        console.log(e)
    }
};

function createH1() {
    const h1 = document.createElement('h1');
    return h1;
};

function createParagraph() {
    const p = document.createElement('p');
    return p;
};

function insert_img_about_movie(url) {
    const img = createImg();
    img.src = url;
    return img;
};

function insert_title_movie(title_movie) {
    const h1 = createH1();
    h1.innerHTML = title_movie;
    return h1;

};

function insert_date_movie(date_movie) {
    const p = createParagraph();
    p.innerHTML = date_movie;
    return p;
};

function insert_posters_movies(url_img, title, date) {
    const div = createDiv();
    const img_movie = insert_img_about_movie(url_img);
    const title_movie = insert_title_movie(title);
    const date_movie = insert_date_movie(date);

    title_movie.classList.add('title_of_movie');

    div.appendChild(img_movie);
    div.appendChild(title_movie);
    div.appendChild(date_movie);

    return div;
};

function inserH1_about_serie(title) {
    const h1 = createH1();
    h1.innerHTML = title;
    return h1;
}

function inserP_about_serie(about_serie) {
    const p = createParagraph();
    p.innerHTML = about_serie;;
    return p;
}

function insert_estrela_vote(code) {
    const p = createParagraph();
    p.innerHTML = code;
    return p;
};

function insert_vote_population(vote) {
    const p = createParagraph(vote);
    p.innerHTML = vote;
    return p;
};

function insert_season_about_serie(season) {
    const p = createParagraph();
    p.innerHTML = season;
    return p;
};

function insert_episode_about_serie(episode) {
    const p = createParagraph();
    p.innerHTML = episode;
    return p;
};

function insert_informations_about_serie(code, vote, season, episode) {
    const div = createDiv();
    const code_hex = insert_estrela_vote(code);
    const vote_population = insert_vote_population(vote);
    const season_serie = insert_season_about_serie(season);
    const episode_serie = insert_episode_about_serie(episode);

    code_hex.style.color = '#ffe500';

    div.classList.add('info_about_serie');

    div.appendChild(code_hex);
    div.appendChild(vote_population);
    div.appendChild(season_serie);
    div.appendChild(episode_serie);
    
    return div;
};

function insertTitle_and_description_about_serie(title, overview) {
    const div = createDiv();
    const title_serie = inserH1_about_serie(title);
    const overview_serie = inserP_about_serie(overview);

    div.appendChild(title_serie);
    div.appendChild(overview_serie);

    return div;
};

async function getConfigApi() {
    const config = await fetchApi('https://api.themoviedb.org/3/configuration', options);
    return config;
};

async function getBaseUrl() {
    const response = await getConfigApi();
    return response.images.base_url;
};

async function getBackdropSize() {
    const response = await getConfigApi();
    return response.images.backdrop_sizes[3];
};

async function getSizePoster() {
    const response = await getConfigApi();
    return response.images.poster_sizes[4];
};

async function getSizePosterOfSlide() {
    const response = await getConfigApi();
    return response.images.poster_sizes[6];
};

async function catchPosterSizeImgOfMenu() {
    const response = await getConfigApi();
    return response.images.poster_sizes[2];
};

async function getMovies() {
    const response = await fetchApi(`https://api.themoviedb.org/3/movie/top_rated?api_key=${elements.apiKey}&language=pt-BR&page=${Math.floor(Math.random() * 100)}`, options);
    return response.results;
};

async function setMovies() {
    const response = await getMovies();
    return response;
};

async function getDetailsMovie(movieId) {
    const response = await fetchApi(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${elements.apiKey}&language=pt-BR`, options);
    return response;
};

async function getVideoId(movieId) {
    const response = await fetchApi(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${elements.apiKey}&language=pt-BR`, options);
    return response.results.filter(video => video.type.toLowerCase().includes('trailer'));
};

async function setDetailsId(movieId) {
    const response = await getDetailsMovie(movieId);
    return response;
};

async function catchTopRatedSeries() {
    const response = await fetchApi(`https://api.themoviedb.org/3/tv/top_rated?api_key=${elements.apiKey}&language=pt-BR&page=${Math.floor(Math.random() * 100)}`, options);
    return response.results;
}

async function catchSerieDetails(serieId) {
    const response = await fetchApi(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${elements.apiKey}&language=pt-BR`, options);
    return response;
}

async function updateSerieDetails(serieDetails) {
    const base_url = await getBaseUrl();
    const size_img = await getBackdropSize();
    elements.containerSerie.style.backgroundImage = `url('${base_url}${size_img}${serieDetails.backdrop_path}')`;
    elements.containerAboutSerie.appendChild(insertTitle_and_description_about_serie(serieDetails.name, serieDetails.overview));
    elements.containerAvalationSerie.appendChild(insert_informations_about_serie('&#9733', `${serieDetails.vote_average.toFixed(1).replace(/\./g, ',')}`, `Temporadas ${serieDetails.number_of_seasons}`, `Episódios ${serieDetails.number_of_episodes}`));
}

async function updateDetails(movieDetails) {
    const base_url = await getBaseUrl();
    const backdrop_size_img = await getBackdropSize();
    const size_poster = await getSizePoster();
    elements.containerMovie.style.backgroundImage = `url('${base_url}${backdrop_size_img}${movieDetails.backdrop_path}')`;
    elements.posterImg.src = `${base_url}${size_poster}${movieDetails.poster_path}`;
    elements.posterImg.alt = movieDetails.title;
    elements.titleOfMovie.textContent = movieDetails.title;
    elements.OverviewAboutMovie.textContent = movieDetails.overview;
    elements.dateMovie.textContent = movieDetails.release_date.slice(0, 4);
    elements.vote.textContent = movieDetails.vote_average.toFixed(1).replace(/\./g, ',');
    elements.genreOne.textContent = movieDetails.genres[0].name;
    elements.genreTwo.textContent = movieDetails.genres[1].name;
};

async function updateRandomSerieSection() {
    try {
        const topRatedSeries = await catchTopRatedSeries();
        const filter_serie = topRatedSeries.filter(serie => {
            return serie.backdrop_path && serie.name && serie.overview.length < 200 && serie.overview.length > 0 && serie.vote_average && serie.backdrop_path !== undefined && serie.backdrop_path !== null;
        });

        let randomSerieIndex = Math.floor(Math.random() * filter_serie.length);

        if(filter_serie.length === 0) {
            randomSerieIndex++;
            return await init();
        }

        const randomSerie = filter_serie[randomSerieIndex];
        const serieDetails = await catchSerieDetails(randomSerie.id);
        updateSerieDetails(serieDetails);
    } catch (error) {
        console.error('Erro ao buscar e atualizar série aleatória:', error);
    }
}

async function updateMovieRandom() {
    try {   
        const movies = await setMovies();
        const filter_movies = movies.filter(movie => {
            return movie.title && movie.overview.length > 0 && movie.overview.length < 200 && movie.genre_ids.length > 1 && movie.release_date && movie.backdrop_path !== null && movie.backdrop_path !== undefined;
        });

        let randomMovieIndex =  Math.floor(Math.random() * filter_movies.length);

        if(filter_movies.length === 0) {
            randomMovieIndex++;
            return await init();
        }
        
        const randomMovie = filter_movies[randomMovieIndex];
        const movieDetails = await setDetailsId(randomMovie.id);
        const movieVideo = await getVideoId(randomMovie.id);
        set_url_trailer(movieVideo);
        updateDetails(movieDetails);
    } catch(e) {
        console.log(e);
    }
};

function set_url_trailer(video) {
    for(let trailer of video) {
        let key;

        if(trailer.name.toLowerCase().includes('dublado')) {
            elements.btn_watch_trailer.style.display = 'block';
            key = trailer.key;
            insertIframe(elements.url_youtube + key);
            return
        }

        if (trailer.name.toLowerCase().includes('legendado')) {
            elements.btn_watch_trailer.style.display = 'block';
            key = trailer.key;
            insertIframe(elements.url_youtube + key);
            return
        }

        elements.btn_watch_trailer.style.display = 'block';
        key = trailer.key;
        insertIframe(elements.url_youtube + key);
        return;
    }
}

async function getMoviesOfMenu() {
    const movies = await getMovies();
    return movies;
};

async function setMoviesOfMenu() {
    let src_imgs = [];
    const base_url = await getBaseUrl();
    const size_img = await catchPosterSizeImgOfMenu();
    const movies = await getMoviesOfMenu();
    const date_movies = movies.map(item => item.release_date.slice(0, 4));
    const title_movies = movies.map(item => item.title);
    const urls_posters = movies.map(item => item.poster_path);
    urls_posters.forEach(url => {
        src_imgs.push(base_url + size_img + url);
    });

    src_imgs.forEach((src, index) => {
        const title_movie = title_movies[index];
        const date_movie = date_movies[index];
        elements.section_movies_description.appendChild(insert_posters_movies(src, title_movie, date_movie));
    });
};

async function getMoviesPopular() {
    const response = await fetchApi(`https://api.themoviedb.org/3/movie/popular?api_key=${elements.apiKey}&language=pt-BR&page=${Math.floor(Math.random() * 100)}`, options);
    return response.results.filter(movie => movie.title && movie.poster_path);
};

async function setMoviePopular() {
    const movies = await getMoviesPopular();
    insertMoviesInSlide(movies);
};

async function insertMoviesInSlide(moviesPopular) {
    const base_url = await getBaseUrl();
    const poster_size = await getSizePosterOfSlide();
    let src_imgs = [];
    const title_movie = moviesPopular.map(movie => movie.title);
    const posters_movie = moviesPopular.map(movie => movie.poster_path);

    posters_movie.forEach((poster_path) => {
        src_imgs.push(base_url + poster_size + poster_path);
    });

    src_imgs.forEach((src, index) => {
        const alt = title_movie[index];
        insertSlide(src, alt);
    });
};

async function insertPosterWithUserInput() {
    const elements_movies = await setMovies();
    const base_url = await getBaseUrl();
    const size = await catchPosterSizeImgOfMenu();
    elements.input_search.addEventListener('input', (event) => {
        const valueSearch = event.target.value.trim();
        const filter_title_movie = elements_movies.filter(item => item.title.toLowerCase().includes(valueSearch));
            elements.section_movies_description.innerHTML = '';

            if(filter_title_movie.length === 0) {
                const noResult = document.createElement('p');
                noResult.classList.add('no_result_paragraph');
                noResult.innerHTML = 'Nenhum resultado foi encontrado';
                elements.section_movies_description.appendChild(noResult);
            } else {
                filter_title_movie.forEach(movie => {
                    const src = base_url + size + movie.poster_path;
                    elements.section_movies_description.appendChild(insert_posters_movies(src, movie.title, movie.release_date.slice(0, 4)));
                })
            }
    });
};

updateMovieRandom();

async function init() {
    try {
        await Promise.all([setMoviePopular(), setMoviesOfMenu(), updateRandomSerieSection(), insertPosterWithUserInput()]);
    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
    }
}

init();

// script que mostra e esconde o iframe
elements.btn_watch_trailer.addEventListener('click', (event) => {
    event.preventDefault();
    elements.container_iframe.style.display = 'block';
});

elements.close_button.addEventListener('click', () => {
    elements.container_iframe.style.display = 'none';
});

// script do sidebar
const btn_open = document.querySelector('.btn-open');
const sidebar = document.querySelector('.sidebar');

btn_open.addEventListener('click', () => {
    sidebar.classList.toggle('open-sidebar');
});

// script que coloca foco no input de pesquisa quando acionado
document.querySelector('#icon_search').addEventListener('mouseover', () => {
    elements.input_search.focus();
});

// script que remove o foco no input quando o usuário tirar o mouse do ícone
document.querySelector('#icon_search').addEventListener('mouseout', () => {
    elements.input_search.blur();
});