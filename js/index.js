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
const container_logo = document.querySelector('.container-logo');
const input_search = document.querySelector('#input_search');

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

function insertDivWithContent(src_img, alt_img) {
    const div = createDiv();
    const img = createImg();
    img.src = src_img;
    img.alt = alt_img;

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
        let posters = [];
        let name_of_movies = [];
        let src_imgs = [];

        const response_config = await fetch('https://api.themoviedb.org/3/configuration', options);
        const data_configuration = await response_config.json();
        const size_img = data_configuration.images.poster_sizes[6];
        const base_url_img = data_configuration.images.base_url;

        const generate_index_page = Math.floor(Math.random() * 500);

        const response_api = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=${generate_index_page}`, options);

        const data_api = await response_api.json();

        const filter_poster = data_api.results.filter(item => {        
           return item.poster_path && item.title;
        });

        filter_poster.forEach(item => {
            posters.push(item.poster_path);
        });

        filter_poster.forEach(item => {
            name_of_movies.push(item.title);
        });

        for(let url of posters) {
            src_imgs.push(base_url_img + size_img + url);
        }

        src_imgs.forEach((element, index) => {
            const src = src_imgs[index];
            const alt = name_of_movies[index];
            swiper_wrapper.appendChild(insertDivWithContent(src, alt));
        });

    } catch(error) {
        console.log(error);
    }

    try {
        let trailers = [];
        let ids = [];
        let movies = [];
        let currentPage = Math.floor(Math.random() * 500) + 1;

        const response_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_config = await response_config.json();

        const base_url = data_config.images.base_url;
        const size_img_background = data_config.images.backdrop_sizes[3];

        const response_movie_description = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${currentPage}`);
        const data_movie_description = await response_movie_description.json();

        const movies_id = data_movie_description.results.map(item => {
            return item;
        });

        movies_id.forEach(item => {
            ids.push(item.id);
        });

        for (let id of ids) {
            const response_description = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
            const data_description = await response_description.json();
            movies.push(data_description);
        }

        const filter_movies = movies.filter(item => {
            return item.overview.length < 200 && item.overview.length > 0 && item.title.length > 0 && item.vote_average >= 7 && item.poster_path && item.backdrop_path !== undefined && item.backdrop_path !== null && item.genres.length > 1;
        });

        if(filter_movies.length === 0) {
            currentPage++;
            return await getResponseApi();
        }

        const generate_index_of_movie = Math.floor(Math.random() * filter_movies.length);
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

        const url_of_img_background_movie = base_url + size_img_background + url_background;

        // insere imagem no background da sessão do filme
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
            return item.backdrop_path && item.name && item.overview.length < 200 && item.overview.length > 0 && item.vote_average && item.backdrop_path !== undefined && item.backdrop_path !== null;
        });

        const generate_index_of_serie = Math.floor(Math.random() * filter_serie.length);
        const url_background = filter_serie[generate_index_of_serie].backdrop_path;
        const base_url_to_serie = data_response_config.images.base_url;
        const size_backgroud = data_response_config.images.backdrop_sizes[3];
        const full_url_background = base_url_to_serie + size_backgroud + url_background;
        const title_serie = filter_serie[generate_index_of_serie].name;
        const overview_serie = filter_serie[generate_index_of_serie].overview;
        const id_serie = filter_serie[generate_index_of_serie].id;

        // insere url no background da imagem da série
        container_serie.style.backgroundImage = `url('${full_url_background}')`;

        // insere título e overview da série
        container_about_serie.appendChild(insertTitle_and_description_about_serie(title_serie, overview_serie));


        // const url_image_serie = data_response_config.images.base_url + data_response_config.images.backdrop_sizes[3] + data_api_serie.results[1].backdrop_path;

        const response_id_serie = await fetch(`https://api.themoviedb.org/3/tv/${id_serie}?api_key=${apiKey}&language=pt-BR`);
        const data_response_id = await response_id_serie.json();

        // insere a avaliação da série, número de temporadas e episódios da série

         container_avalation_serie.appendChild(insert_informations_about_serie('&#9733', `${data_response_id.vote_average.toFixed(1).replace(/\./g, ',')}`, `Temporadas ${data_response_id.number_of_seasons}`, `Episódios ${data_response_id.number_of_episodes}`));

    } catch(error) {
        console.log(error);
    }

    try {
        const response_pages = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`);
        const data_pages = await response_pages.json();

        const total_pages = data_pages.total_pages;
        const generate_index_page = Math.floor(Math.random() * total_pages);

        const response_movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${generate_index_page}`);
        const data_movies = await response_movies.json();

        const response_api_config = await fetch('https://api.themoviedb.org/3/configuration');
        const data_response_config = await response_api_config.json();

        const base_url = data_response_config.images.base_url;
        const size = data_response_config.images.poster_sizes[2];

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

        // script que filtra os elementos a partir da pesquisa do input
        input_search.addEventListener('input', (e) => {
            const valueSearch = e.target.value.trim();
            const filter_title_movie = element_movies.filter(item => item.title.toLowerCase().includes(valueSearch));
            section_movies_description.innerHTML = '';

            if(filter_title_movie.length === 0) {
                const noResult = document.createElement('p');
                noResult.classList.add('no_result_paragraph');
                noResult.innerHTML = 'Nenhum resultado foi encontrado';
                section_movies_description.appendChild(noResult);
            } else {
                filter_title_movie.forEach(movie => {
                    const src = base_url + size + movie.poster_path;
                    section_movies_description.appendChild(insert_posters_movies(src, movie.title, movie.release_date.slice(0, 4)));
                })
            }
        });

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

// script que coloca foco no input de pesquisa quando acionado
document.querySelector('#icon_search').addEventListener('mouseover', () => {
    input_search.focus();
});

// script que remove o foco no input quando o usuário tirar o mouse do ícone
document.querySelector('#icon_search').addEventListener('mouseout', () => {
    input_search.blur();
});