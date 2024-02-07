
// Function to initialize the webpage
function initializePage() {
  const allEpisodes = getAllEpisodes();
  renderEpisodes(allEpisodes);

  // Add event listener to search input for filtering episodes
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearch);
}

// Render all episodes on the webpage
function renderEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  removeAllChildren(rootElem);

  episodeList.forEach(episode => {
      const episodeCard = createEpisodeCard(episode);
      rootElem.appendChild(episodeCard);
  });

  displayEpisodeCount(episodeList.length);
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

// Handle search input to filter episodes
function handleSearch(event) {
  const searchTerm = event.target.value.trim().toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filteredEpisodes = allEpisodes.filter(
      (episode) =>
          episode.name.toLowerCase().includes(searchTerm) ||
          episode.summary.toLowerCase().includes(searchTerm)
  );

  renderEpisodes(filteredEpisodes);
}

// Display the count of episodes
function displayEpisodeCount(count) {
  const episodesDisplayAmount = document.querySelector(".episodes-display-amount");
  episodesDisplayAmount.textContent = `Displaying ${count} out of ${getAllEpisodes().length} episodes`;
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

// Initialize the webpage when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializePage);