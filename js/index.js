const container_movie = document.querySelector('.container_movie');
const container_serie = document.querySelector('.container_serie');
const apiKey = 'df475aedfe842e898fa3da1591fa3f01';
const iframe_video = document.querySelector('.iframe-video');
const btn_watch_trailer = document.querySelector('.btn-watch');
const container_iframe = document.querySelector('.iframe-container');
const close_button = document.querySelector('.btn-close');
const swiper_wrapper = document.querySelector('.swiper-wrapper');
const p_overview_about_movie = document.querySelector('.overview-about-movie');
const title_of_movie = document.querySelector('.title_movie');
const date_movie = document.querySelector('.date_movie');
const vote = document.querySelector('.vote');
const url_youtube = 'https://www.youtube.com/embed/';
const genre_one = document.querySelector('.genre_one');
const genre_two = document.querySelector('.genre_two');
const poster_img = document.querySelector('.poster_img');
const logo = document.querySelector('.logo_img');
const container_about_serie = document.querySelector('.container_about_serie');
const container_avalation_serie = document.querySelector('.avaliation_serie');

function createImg() {
    const img = document.createElement('img');
    return img;
};

function createDiv() {
    const div = document.createElement('div');
    return div;
};

function createH1() {
    const h1 = document.createElement('h1');
    return h1;
};

function createParagraph() {
    const p = document.createElement('p');
    return p;
};

function insertDivWithContent(src_img) {
    const div = createDiv();
    const img = createImg();
    img.src = src_img;

    div.appendChild(img);
    div.classList.add('swiper-slide');
    return div;
};

function createIframe() {
    const iframe = document.createElement('iframe');
    return iframe;
}

function insertIframe(src) {
    const iframe = createIframe();
    iframe.src = src;
    iframe.width = '560';
    iframe.height = '315';
    iframe.style.border = 'none';
    iframe_video.appendChild(iframe);
    return iframe_video;
}

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

async function getResponseApi() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/550/videos?api_key=${apiKey}&language=pt-BR`, options);
        const data = await response.json();
    } catch(error) {
        console.log(error);
    }

    let result_api = [];
    let size;
    let base_url;
    let srcs_img = [];
    let about_movie = [];

    try {
        const response = await fetch('https://api.themoviedb.org/3/configuration', options);
        const data_configuration = await response.json();
        size = data_configuration.images.poster_sizes[6]; // tamanho original
        base_url = data_configuration.images.base_url;
    } catch(error) {
        console.log(error);
    }


    try {
        const response_api = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR', options);
        const data_api = await response_api.json();
        result_api.push(data_api.results);
        result_api.forEach(itens => {
            for(let item of itens) {
                srcs_img.push(base_url + size + item.poster_path);
                about_movie.push(item);
            }
        });
    
        srcs_img.forEach(src => {
            swiper_wrapper.appendChild(insertDivWithContent(src));
        });

    } catch(error) {
        console.log(error);
    }

    // kung fu panda 4
    title_of_movie.innerHTML = about_movie[1].title;
    date_movie.innerHTML = about_movie[1].release_date.slice(0, 4);
    p_overview_about_movie.innerHTML = about_movie[1].overview;
    const vote_public = about_movie[1].vote_average;
    vote.innerHTML = vote_public.toFixed(1).replace(/\./g, ',');

    // console.log(about_movie[1]);

    // filmes nos cinemas agora
    try {
        const response_api = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`, options);
        const data_api = await response_api.json();
    } catch(error) {
        console.log(error);
    }

    // consulta do video do filme por id
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/
        1011985/videos?api_key=${apiKey}`, options);
        const data_api = await response.json();
        const api_with_video = data_api.results.map(item => item);
        insertIframe(url_youtube + api_with_video[4].key);
    } catch(error) {
        console.log(error);
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/
        1011985?api_key=${apiKey}&language=pt-BR`);
        const data_api = await response.json();

        const url_logo = data_api.production_companies[0].logo_path;
        const name_alt_logo = data_api.production_companies[0].name;

        const response_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_config = await response_config.json();

        const size_logo = data_config.images.logo_sizes[2];

        
        const size_img = data_config.images.backdrop_sizes[3];
        const base_url = data_config.images.base_url;
        const url_img = data_api.belongs_to_collection.backdrop_path;

        // insere url da logo e texto alternativo
        logo.src = base_url + size_logo + url_logo;
        logo.alt = name_alt_logo;

        // insere url do background do filme
        const url_of_img_background_movie = base_url + size_img + url_img;
        container_movie.style.backgroundImage = `url('${url_of_img_background_movie}')`;
       
        // insere url e texto alternativo do poster inicial
        poster_img.src = base_url + data_config.images.poster_sizes[5] + data_api.poster_path;
        poster_img.alt = data_api.title;
   
        let generatedNumbers = [];
        
        function generateUniqueNumber() {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * data_api.genres.length);
            } while (generatedNumbers.includes(randomNumber));

            generatedNumbers.push(randomNumber);
            return randomNumber;
        }

        const generate_number_one = generateUniqueNumber();
        const generate_number_two = generateUniqueNumber();

         genre_one.innerHTML = data_api.genres[generate_number_one].name;
         genre_two.innerHTML = data_api.genres[generate_number_two].name;

    } catch(error) {
        console.log(error);
    }

    try {
        const response_api_serie = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`, options);
        const data_api_serie = await response_api_serie.json();

        const response_api_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_response_config = await response_api_config.json();

        const url_image_serie = data_response_config.images.base_url + data_response_config.images.backdrop_sizes[3] + data_api_serie.results[1].backdrop_path;

        // insere url no background da imagem da série
        container_serie.style.backgroundImage = `url('${url_image_serie}')`;

        // console.log(data_api_serie.results[1]);
    } catch(error) {
        console.log(error);
    }

    try {
        // 1396
        const response_to_id = await fetch(`https://api.themoviedb.org/3/tv/1396?api_key=${apiKey}&language=pt-BR`);
        const data_to_api_id = await response_to_id.json();
        
        container_about_serie.appendChild(insertTitle_and_description_about_serie(data_to_api_id.original_name, data_to_api_id.overview));
        container_avalation_serie.appendChild(insert_informations_about_serie('&#9733', `${data_to_api_id.vote_average.toFixed(1).replace(/\./g, ',')} |`, `Temporadas ${data_to_api_id.number_of_seasons} |`, `Episódios ${data_to_api_id.number_of_episodes}`));

    } catch(error) {
        console.log(error);
    }
}

getResponseApi();

// script que mostra e esconde o iframe
btn_watch_trailer.addEventListener('click', () => {
    container_iframe.style.display = 'block';
});

close_button.addEventListener('click', () => {
    container_iframe.style.display = 'none';
});