function toggleMenu() {
  const links = document.querySelector(".header-links");
  const hamburger = document.getElementById("hamburger");
  links.classList.toggle("show");
  hamburger.classList.toggle("open");
}

//Github Repositories
const languageColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

fetch("https://api.github.com/users/hammadaiy/repos")
  .then((response) => response.json())
  .then((data) => {
    const repoList = document.getElementById("repo-list");
    data.forEach((repo) => {
      const listItem = document.createElement("li");
      if (repo.language) {
        const languageColor = languageColors[repo.language] || "#000000";
        listItem.innerHTML = `
                      <a href="${repo.html_url}">${repo.name}</a> - 
                      <span style="color: ${languageColor};">&#9679;</span> ${repo.language}
                  `;
      } else {
        listItem.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
      }
      repoList.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching repositories:", error));
