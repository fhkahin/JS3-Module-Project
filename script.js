// Function to initialize the webpage
function initializePage() {
  fetchEpisodesData();
}

// Fetch episode data from TVMaze API
function fetchEpisodesData() {
  const apiUrl = 'https://api.tvmaze.com/shows/82/episodes';

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(episodesData => {
          renderEpisodes(episodesData);
          addSearchEventListener(episodesData);
      })
      .catch(error => {
          handleFetchError(error);
      });
}

// Render episodes on the webpage
function renderEpisodes(episodesData) {
  const rootElem = document.getElementById("root");
  removeAllChildren(rootElem);

  episodesData.forEach(episode => {
      const episodeCard = createEpisodeCard(episode);
      rootElem.appendChild(episodeCard);
  });

  displayEpisodeCount(episodesData.length);
}

// Create an episode card
function createEpisodeCard(episode) {
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode");

  const episodeCode = `S${pad(episode.season)}E${pad(episode.number)}`;

  const titleElem = document.createElement("h2");
  titleElem.textContent = `${episode.name} - ${episodeCode}`;
  episodeContainer.appendChild(titleElem);

  const imageElem = document.createElement("img");
  imageElem.src = episode.image.medium;
  imageElem.alt = `${episode.name} Image`;
  episodeContainer.appendChild(imageElem);

  const summaryElem = document.createElement("div");
  summaryElem.innerHTML = episode.summary;
  episodeContainer.appendChild(summaryElem);

  return episodeContainer;
}

// Add event listener to search input for filtering episodes
function addSearchEventListener(episodesData) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
      handleSearch(this.value.trim().toLowerCase(), episodesData);
  });
}

// Handle search input to filter episodes
function handleSearch(searchTerm, episodesData) {
  const filteredEpisodes = episodesData.filter(
      episode =>
          episode.name.toLowerCase().includes(searchTerm) ||
          episode.summary.toLowerCase().includes(searchTerm)
  );

  renderEpisodes(filteredEpisodes);
}

// Display the count of episodes
function displayEpisodeCount(count) {
  const episodesDisplayAmount = document.querySelector(".episodes-display-amount");
  episodesDisplayAmount.textContent = `Displaying ${count} out of ${count} episodes`;
}

// Helper function to pad numbers with leading zeros
function pad(number) {
  return String(number).padStart(2, '0');
}

// Helper function to remove all child nodes of a parent element
function removeAllChildren(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// Handle fetch error
function handleFetchError(error) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = 'An error occurred while fetching data. Please try again later.';
}

// Initialize the webpage when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializePage);
