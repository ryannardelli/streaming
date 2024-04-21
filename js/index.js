const container_movie = document.querySelector('.container_movie');
const container_serie = document.querySelector('.container_serie');
const apiKey = 'df475aedfe842e898fa3da1591fa3f01';
const iframe_video = document.querySelector('.iframe-video');
const btn_watch_trailer = document.querySelector('#btn-watch-trailer');
const container_iframe = document.querySelector('.iframe-container');
const close_button = document.querySelector('.btn-close');
const swiper_wrapper = document.querySelector('.swiper-wrapper');
const title_of_movie = document.querySelector('.title_movie');
const p_overview_about_movie = document.querySelector('.overview-about-movie');
const date_movie = document.querySelector('.date_movie');
const vote = document.querySelector('.vote');
const url_youtube = 'https://www.youtube.com/embed/';
const genre_one = document.querySelector('.genre_one');
const genre_two = document.querySelector('.genre_two');
const poster_img = document.querySelector('.poster_img');
const logo = document.querySelector('.logo_img');
const container_about_serie = document.querySelector('.container_about_serie');
const container_avalation_serie = document.querySelector('.avaliation_serie');
const section_movies_description = document.querySelector('.container-movies-description');

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

    // filmes nos cinemas agora
    try {
        const response_api = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`, options);
        const data_api = await response_api.json();
    } catch(error) {
        console.log(error);
    }

    try {
        let ids = [];
        let movies = [];
        let trailers = [];

        const response_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_config = await response_config.json();

        const base_url = data_config.images.base_url;
        const size_img_background = data_config.images.backdrop_sizes[3];

        const response_id = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);

        const data_api_id = await response_id.json();

        data_api_id.results.filter(item => {
            ids.push(item.id);
        });

        for (let id of ids) {
            const response_description = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
            const data_description = await response_description.json();
            movies.push(data_description);
        }
        
        const filter_movies = movies.filter(item => {
            return item.overview && item.title && item.vote_average && item.poster_path;
        });

        const generate_index_of_movie = Math.floor(Math.random() * filter_movies.length);
        const generate_index_for_logo = Math.floor(Math.random() * filter_movies[generate_index_of_movie].production_companies.length);
        const url_background = filter_movies[generate_index_of_movie].backdrop_path;
        const title_movie = filter_movies[generate_index_of_movie].title;
        const overview_movie = filter_movies[generate_index_of_movie].overview;
        const poster_size = data_config.images.poster_sizes[4];
        const url_poster = filter_movies[generate_index_of_movie].poster_path;
        const date = filter_movies[generate_index_of_movie].release_date.slice(0, 4);
        const vote_population = filter_movies[generate_index_of_movie].vote_average.toFixed(1).replace(/\./g, ',');
        const genre_one_movie = filter_movies[generate_index_of_movie].genres[0].name;
        const genre_two_movie = filter_movies[generate_index_of_movie].genres[1].name;
        const id_movie = filter_movies[generate_index_of_movie].id;
        const logo_size = data_config.images.logo_sizes[1];
        const url_logo = filter_movies[generate_index_of_movie].production_companies[generate_index_for_logo].logo_path;
        const name_companie = filter_movies[generate_index_of_movie].production_companies[generate_index_for_logo].name;

        // insere logo e texto alternativo
        logo.src = base_url + logo_size + url_logo;
        logo.alt = name_companie;

        const response_video = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}/videos?api_key=${apiKey}&language=pt-BR`);
        const data_video = await response_video.json();

        for(let item of data_video.results) {
            if(item.type.toLowerCase().includes('trailer')) {
                trailers.push(item);
            }
        }

        function set_url_trailer() {
            for(let trailer of trailers) {
    
                let key;
    
                if(trailer.name.toLowerCase().includes('dublado')) {
                    btn_watch_trailer.style.display = 'block';
                    key = trailer.key;
                    insertIframe(url_youtube + key);
                    return
                }

                if (trailer.name.toLowerCase().includes('legendado')) {
                    btn_watch_trailer.style.display = 'block';
                    key = trailer.key;
                    insertIframe(url_youtube + key);
                    return
                }

                btn_watch_trailer.style.display = 'block';
                key = trailer.key;
                insertIframe(url_youtube + key);
                return;
    
            }
        }

        set_url_trailer();

        url_of_img_background_movie = base_url + size_img_background + url_background;

        // insere imagem no background da sessão filme
        container_movie.style.backgroundImage = `url('${url_of_img_background_movie}')`;

        // insere titulo e overview do filme
        title_of_movie.innerHTML = title_movie;
        p_overview_about_movie.innerHTML = overview_movie;

        // insere o poster do filme e o texto alternativo
        poster_img.src = base_url + poster_size + url_poster;
        poster_img.alt = title_movie;

        // insere data do filme
        date_movie.innerHTML = date;

        // insere classificação do filme
        vote.innerHTML = vote_population;

        // insere gêneros do filme
        genre_one.innerHTML = genre_one_movie;
        genre_two.innerHTML = genre_two_movie;

    } catch(error) {
        console.log(error);
    }

    try {
        const response_pages = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`);
        const data_page_api = await response_pages.json();

        const response_api_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_response_config = await response_api_config.json();

        const total_page = data_page_api.total_pages;

        const generate_index_page = Math.floor(Math.random() * total_page);

        const response_api_serie = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=${generate_index_page}`, options);
        const data_api_serie = await response_api_serie.json();

        const filter_serie = data_api_serie.results.filter(item => {
            return item.backdrop_path.length > 0 && item.name && item.overview.length < 300 && item.overview.length > 0 && item.vote_average;
        });

        const generate_index_of_serie = Math.floor(Math.random() * filter_serie.length);
        const url_background = filter_serie[generate_index_of_serie].backdrop_path;
        const base_url_to_serie = data_response_config.images.base_url;
        const size_backgroud = data_response_config.images.backdrop_sizes[3];
        const full_url_background = base_url_to_serie + size_backgroud + url_background;
        const title_serie = filter_serie[generate_index_of_serie].name;
        const overview_serie = filter_serie[generate_index_of_serie].overview;

        console.log(filter_serie[generate_index_of_serie]);

        // insere url no background da imagem da série
        container_serie.style.backgroundImage = `url('${full_url_background}')`;

        // insere título e overview da série
        container_about_serie.appendChild(insertTitle_and_description_about_serie(title_serie, overview_serie));


        // const url_image_serie = data_response_config.images.base_url + data_response_config.images.backdrop_sizes[3] + data_api_serie.results[1].backdrop_path;


    } catch(error) {
        console.log(error);
    }

    try {
        const response_to_id = await fetch(`https://api.themoviedb.org/3/tv/1396?api_key=${apiKey}&language=pt-BR`);
        const data_to_api_id = await response_to_id.json();
        
        // container_about_serie.appendChild(insertTitle_and_description_about_serie(data_to_api_id.original_name, data_to_api_id.overview));
        // container_avalation_serie.appendChild(insert_informations_about_serie('&#9733', `${data_to_api_id.vote_average.toFixed(1).replace(/\./g, ',')} |`, `Temporadas ${data_to_api_id.number_of_seasons} |`, `Episódios ${data_to_api_id.number_of_episodes}`));

    } catch(error) {
        console.log(error);
    }

    try {
        const response_movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`)
        const data_movies = await response_movies.json();

        const response_api_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_response_config = await response_api_config.json();

        let movies = [];
        let src_imgs = [];
        let element_movies = [];
        let title_movies = [];
        let date_movies_year = [];

        movies.push(data_movies.results);
        movies.forEach(movies => {
            for(let movie of movies) {
                element_movies.push(movie);
            }
        });

        element_movies.filter((item => {
            src_imgs.push(data_response_config.images.base_url + data_response_config.images.poster_sizes[2] + item.poster_path);
        }));


        element_movies.filter((item => {
            title_movies.push(item.title);
        }));

        element_movies.filter((item => {
            date_movies_year.push(item.release_date.slice(0, 4));
        }));

        // insere imagem, titulo, data dos filmes
        element_movies.forEach((element, index) => {
            const src = src_imgs[index];
            const title = title_movies[index];
            const date_year = date_movies_year[index];
            section_movies_description.appendChild(insert_posters_movies(src, title, date_year));
        })

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

// script do sidebar

const btn_open = document.querySelector('.btn-open');
const sidebar = document.querySelector('.sidebar');

btn_open.addEventListener('click', () => {
    sidebar.classList.toggle('open-sidebar');
});