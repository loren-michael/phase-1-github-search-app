document.addEventListener("DOMContentLoaded", () => {
    const gitSearchForm = document.querySelector("#github-form");
    gitSearchForm.addEventListener('submit', gitSearch)
});

function gitSearch (e) {
    e.preventDefault();
    // console.log(e.target)
    getUsers(e.target[0].value)
    e.target[0].value = ""
    const userList = document.querySelector("#user-list");
    userList.textContent = ""
    
}

function getUsers (username) {
    fetch(`https://api.github.com/search/users?q=${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp =>resp.json())
    .then(resp => resp.items.map(item => displayUser(item))
    )}

function displayUser (user) {
    //login and avatar url
    const userList = document.querySelector("#user-list");
    const li = document.createElement('li');
    const image = document.createElement('img');
    image.src = user.avatar_url;
    image.alt = user.login
    image.id = user.login
    image.addEventListener('click', getRepos)
    const h3 = document.createElement('h3');
    h3.innerText = user.login;
    li.append(image, h3)
    userList.append(li)
}


function getRepos (e) {
    // console.log(e.target)
    const repoList = document.getElementById('repos-list')
    repoList.textContent = ""
    fetch(`https://api.github.com/users/${e.target.id}/repos`, {
        method: "GET",
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then (resp => resp.json())
    .then (resp => resp.map(r => displayRepos(r)))
}

function displayRepos (repo) {
    const repoList = document.getElementById('repos-list')
    const li = document.createElement('li')
    li.textContent = repo.name
    repoList.append(li)
}














