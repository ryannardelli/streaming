const apiKey = 'df475aedfe842e898fa3da1591fa3f01';
const iframe_video = document.querySelector('.iframe-video');
const btn_watch_trailer = document.querySelector('.btn-watch-trailer');
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

function createImg() {
    const img = document.createElement('img');
    return img;
};

function createDiv() {
    const div = document.createElement('div');
    return div;
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
        console.log(data_configuration);
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
        console.log(data_api.genres);
        
        // falta resolver a questão dos numeros gerarem iguais
        const generate_number_one = Math.floor(Math.random() * data_api.genres.length - 1) + 1;
        const generate_number_two = Math.floor(Math.random() * data_api.genres.length - 1) + 1;

        console.log(generate_number_one);
        console.log(generate_number_two);

        genre_one.innerHTML = data_api.genres[generate_number_one].name;
        genre_two.innerHTML = data_api.genres[generate_number_two].name;

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
    iframe_container.style.display = 'none';
});