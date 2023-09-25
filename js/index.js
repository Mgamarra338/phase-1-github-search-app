document.getElementById("github-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search").value;
    searchGitHubUsers(searchQuery);
});

function searchGitHubUsers(searchQuery) {
    const url = `https://api.github.com/search/users?q=${searchQuery}`;
    const headers = { "Accept": "application/vnd.github.v3+json" };
    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.innerHTML = "";
            data.items.forEach(user => {
                const listItem = document.createElement("li");
                const username = document.createElement("span");
                const avatar = document.createElement("img");
                const profileLink = document.createElement("a");
                username.textContent = user.login;
                avatar.src = user.avatar_url;
                avatar.alt = `${user.login}'s avatar`;
                profileLink.href = user.html_url;
                profileLink.textContent = "View Profile";
                listItem.appendChild(username);
                listItem.appendChild(document.createElement("br"));
                listItem.appendChild(avatar);
                listItem.appendChild(document.createElement("br"));
                listItem.appendChild(profileLink);
                listItem.addEventListener("click", function () {
                    getUserRepositories(user.login);
                });
                userList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
function getUserRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    const headers = { "Accept": "application/vnd.github.v3+json" };
    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            const reposList = document.getElementById("repos-list");
            reposList.innerHTML = "";
            data.forEach(repo => {
                const listItem = document.createElement("li");
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
                listItem.appendChild(repoLink);
                reposList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}