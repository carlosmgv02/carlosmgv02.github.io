const username = "carlosmgv02";
const EXPERIENCE_INITIAL_LIMIT = 2;
let allExperiences = [];
let showingAllExperiences = false;

let allEducation = [];

// Obtener y mostrar la foto de perfil desde GitHub
fetch(`https://api.github.com/users/${username}`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("profile-pic").src = data.avatar_url;
  })
  .catch((error) => console.error("Error fetching profile image:", error));

// Cargar experiencias
fetch("data/experiences.json")
  .then((response) => response.json())
  .then((data) => {
    allExperiences = data;
    renderExperiences();
  })
  .catch((error) =>
    console.error("Error fetching experiences from JSON:", error)
  );

// Cargar educación
fetch("data/education.json")
  .then((response) => response.json())
  .then((data) => {
    allEducation = data;
    renderEducation();
  })
  .catch((error) =>
    console.error("Error fetching education from JSON:", error)
  );

function parseYearsFromPeriod(period) {
  const yearMatch = period.match(/\d{4}/);
  if (yearMatch) return parseInt(yearMatch[0]);
  return null;
}

function renderExperiences() {
  const experienceContainer = document.getElementById("experience-container");
  experienceContainer.innerHTML = "";

  let experiencesToShow = showingAllExperiences
    ? allExperiences
    : allExperiences.slice(0, EXPERIENCE_INITIAL_LIMIT);

  let currentYear = null;

  experiencesToShow.forEach((exp) => {
    const expDiv = document.createElement("div");
    expDiv.classList.add("experience-item");

    const startYear = parseYearsFromPeriod(exp.period);
    if (startYear && startYear !== currentYear) {
      currentYear = startYear;
      const yearLabel = document.createElement("h3");
      yearLabel.style.marginTop = "20px";
      yearLabel.style.marginBottom = "10px";
      yearLabel.style.fontWeight = "bold";
      yearLabel.textContent = currentYear;
      experienceContainer.appendChild(yearLabel);
    }

    if (exp.logo) {
      const logoImg = document.createElement("img");
      logoImg.src = exp.logo;
      logoImg.alt = exp.company || "Company Logo";
      logoImg.classList.add("experience-logo");
      expDiv.appendChild(logoImg);
    }

    const title = document.createElement("h3");
    title.textContent = exp.role;
    expDiv.appendChild(title);

    if (exp.company) {
      const company = document.createElement("h4");
      company.textContent = exp.company;
      expDiv.appendChild(company);
    }

    const period = document.createElement("p");
    period.innerHTML = `<em>${exp.period}${
      exp.location ? " | " + exp.location : ""
    }</em>`;
    expDiv.appendChild(period);

    const list = document.createElement("ul");
    exp.responsibilities.forEach((resp) => {
      const li = document.createElement("li");
      li.textContent = resp;
      list.appendChild(li);
    });
    expDiv.appendChild(list);

    if (exp.stack) {
      const stackP = document.createElement("p");
      stackP.textContent = exp.stack;
      expDiv.appendChild(stackP);
    }

    experienceContainer.appendChild(expDiv);
  });

  const toggleBtn = document.getElementById("toggle-experience-btn");
  if (allExperiences.length > EXPERIENCE_INITIAL_LIMIT) {
    toggleBtn.style.display = "inline-block";
    toggleBtn.textContent = showingAllExperiences ? "Show less" : "Show more";
  } else {
    toggleBtn.style.display = "none";
  }
}

document
  .getElementById("toggle-experience-btn")
  .addEventListener("click", () => {
    showingAllExperiences = !showingAllExperiences;
    renderExperiences();
  });

// Render education timeline
function renderEducation() {
  const educationContainer = document.getElementById("education-container");
  educationContainer.innerHTML = "";

  let currentYear = null;

  allEducation.forEach((edu) => {
    const eduDiv = document.createElement("div");
    eduDiv.classList.add("education-timeline-item");

    const startYear = parseYearsFromPeriod(edu.period);
    if (startYear && startYear !== currentYear) {
      currentYear = startYear;
      const yearLabel = document.createElement("h3");
      yearLabel.style.marginTop = "20px";
      yearLabel.style.marginBottom = "10px";
      yearLabel.style.fontWeight = "bold";
      yearLabel.textContent = currentYear;
      educationContainer.appendChild(yearLabel);
    }

    if (edu.logo) {
      const logoImg = document.createElement("img");
      logoImg.src = edu.logo;
      logoImg.alt = edu.institution || "Institution Logo";
      logoImg.classList.add("education-logo");
      eduDiv.appendChild(logoImg);
    }

    const title = document.createElement("h3");
    title.textContent = edu.title;
    eduDiv.appendChild(title);

    const institution = document.createElement("h4");
    institution.textContent = edu.institution;
    eduDiv.appendChild(institution);

    const period = document.createElement("p");
    period.innerHTML = `<em>${edu.period}</em>`;
    eduDiv.appendChild(period);

    if (edu.details) {
      const detailsP = document.createElement("p");
      detailsP.textContent = edu.details;
      eduDiv.appendChild(detailsP);
    }

    educationContainer.appendChild(eduDiv);
  });
}

// Cargar repos para el carousel
fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((repos) => {
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const track = document.getElementById("carousel-track");
    repos.forEach((repo) => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");

      const repoImageUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
      const repoImage = document.createElement("img");
      repoImage.src = repoImageUrl;
      repoImage.alt = repo.name;
      repoImage.onclick = () => {
        window.open(repo.html_url, "_blank");
      };

      const repoContent = document.createElement("div");
      repoContent.classList.add("repo-content");

      const repoName = document.createElement("h3");
      repoName.textContent = repo.name;

      const repoDesc = document.createElement("p");
      repoDesc.textContent = repo.description || "No description";

      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.textContent = "View Repository";

      repoContent.appendChild(repoName);
      repoContent.appendChild(repoDesc);
      repoContent.appendChild(repoLink);

      repoCard.appendChild(repoImage);
      repoCard.appendChild(repoContent);
      track.appendChild(repoCard);
    });

    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    let currentPosition = 0;
    const cardWidth = 270;
    const trackWidth = track.scrollWidth;
    const visibleWidth = document.querySelector(
      ".carousel-track-container"
    ).clientWidth;

    prevBtn.addEventListener("click", () => {
      currentPosition = Math.min(currentPosition + cardWidth, 0);
      track.style.transform = `translateX(${currentPosition}px)`;
    });

    nextBtn.addEventListener("click", () => {
      const maxOffset = -(trackWidth - visibleWidth);
      currentPosition = Math.max(currentPosition - cardWidth, maxOffset);
      track.style.transform = `translateX(${currentPosition}px)`;
    });
  })
  .catch((error) => console.error("Error fetching repositories:", error));

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
