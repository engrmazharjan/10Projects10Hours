
// API
const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

getUser('florinpop17');

async function getUser(username) {
    const response = await fetch(APIURL + username);
    const responseData = await response.json();

    console.log(responseData);

    createUserCard(responseData);
    getRepos(username);
}
// get repos 
async function getRepos(username) {
    const response = await fetch(APIURL + username + '/repos');
    const responseData = await response.json();

    addReposToCard(responseData);
}

// create user cart
function createUserCard(user){

    const cardHTML = `
        <div class='card'>
            <div>
                <img class='avatar' src ='${user.avatar_url}' alt='${user.name}' />
            </div>
            <div class = 'user-info'>
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id = 'repos'></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}
// add repos to card
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .forEach((repo) => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');

            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
    });
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    } 
});