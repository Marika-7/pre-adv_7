'use strict';

// get form
let form = document.forms.search;

// functions for input
// add button for clear input
form.input.oninput = () => form.clear.classList.remove('hide');
form.input.onfocus = () => form.input.value !== '' ? form.clear.classList.remove('hide') : 0;

// functions for buttons
// clear input field, set focus
form.clear.onclick = () => {
    form.input.value = '';
    form.clear.classList.add('hide');
    form.input.focus();
};

// request to the server - name of movie
form.btn.onclick = () => {
    getData();
    form.clear.classList.add('hide');
}

// gets data from server, processes the response
async function getData() {
    try {
        const response = await fetch('http://www.omdbapi.com/?s=' + form.input.value + '&apikey=270d6991');
        const data = await response.json();
        fillPage(data.Search);
    }
    catch {}
}

// fills the page with movie cards; get array with films
function fillPage(arr) {
    document.querySelector('.result').textContent = '';
    for(let i = 0; i<arr.length; i++) {
        createCard(arr[i]);
    }
}

// creates film's card, fills with data, adds to page; get movie data
function createCard (obj) {
    let card = document.createElement('div');
    card.classList.add('card');
    let img = document.createElement('img');
    img.setAttribute('src', obj.Poster);
    img.setAttribute('alt', obj.Title);
    img.classList.add('card__poster');
    card.append(img);
    let h2 = document.createElement('h2');
    h2.textContent = obj.Title;
    h2.classList.add('card__name');
    card.append(h2);
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.textContent = obj. Type;
    p2.textContent = obj.Year;
    p1.classList.add('card__info');
    p2.classList.add('card__info');
    card.append(p1);
    card.append(p2);
    let more = document.createElement('button');
    more.textContent = 'More details';
    more.classList.add('btn');
    more.classList.add('card__more');
    more.onclick = getMoreData.bind(null, obj.imdbID);
    card.append(more);
    document.querySelector('.result').append(card);
}

// request to the server - movie id
async function getMoreData(imdbID) {
    const response = await fetch('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&apikey=270d6991');
    const data = await response.json();
    createModal(data);
}

// fills modal with data
function createModal(data) {
    document.querySelector('.modal__poster').setAttribute('src', data.Poster);
    document.querySelector('.modal__poster').setAttribute('alt', data.Title);
    document.querySelector('.modal__name').textContent = data.Title;
    document.querySelector('.modal__details').textContent = data.Rated + ' ' + data.Year + ' ' + data.Genre;
    document.querySelectorAll('.modal__p')[0].textContent = data.Plot;
    document.querySelectorAll('.modal__p')[1].textContent = data.Writer;
    document.querySelectorAll('.modal__p')[2].textContent = data.Director;
    document.querySelectorAll('.modal__p')[3].textContent = data.Actors;
    document.querySelectorAll('.modal__p')[4].textContent = data.BoxOffice;
    document.querySelectorAll('.modal__p')[5].textContent = data.Awards;
    document.querySelectorAll('.modal__p')[6].textContent = '';
    for(let i = 0; i < data.Ratings.length; i++) {
        let p = document.createElement('p');
        p.textContent = data.Ratings[i].Source + ' ' + data.Ratings[i].Value;
        document.querySelectorAll('.modal__p')[6].append(p);
    }
    document.querySelector('.shadow').classList.remove('hide');
}

// close modal
document.querySelector('.shadow').onclick = (event) => { 
    if(event.target == document.querySelector('.shadow')) {
        document.querySelector('.shadow').classList.add('hide');
    }
}
