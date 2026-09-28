async function searchRepos() {

    let username = document.getElementById("username").value;

    let results = document.getElementById("repoResults");

    results.innerHTML = "";

    let response = await fetch("https://api.github.com/users/" + username + "/repos");

    let repos = await response.json();

    for (let i = 0; i < repos.length; i++) {

        let repo = repos[i];

        results.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">

                        <h3>${repo.name}</h3>

                        <p>${repo.description}</p>

                        <p>Language: ${repo.language}</p>

                        <p>Stars: ${repo.stargazers_count}</p>

                        <a href="${repo.html_url}"
                           target="_blank"
                           class="btn btn-primary">
                           View Repository
                        </a>

                    </div>
                </div>
            </div>
        `;
    }
}