function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.forEach(episode => {
    const episodeCard = makeEpisodeCard(episode);
    rootElem.appendChild(episodeCard);
  });
}


// Splitted the logic to create the episode card (Actually, I prefer to make a new file for this component)
function makeEpisodeCard(episode) {
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode");

  // Here I created the episode code
  const episodeCode = `S${pad(episode.season)}E${pad(episode.number)}`;

  // Then I created  the episode title
  const titleElem = document.createElement("h2");
  titleElem.textContent = `${episode.name} - ${episodeCode}`;
  episodeContainer.appendChild(titleElem);

  // Then I create the  episode image
  const imageElem = document.createElement("img");
  imageElem.src = episode.image.medium;
  imageElem.alt = `${episode.name} Image`;
  episodeContainer.appendChild(imageElem);

  // after that I  created the  episode summary
  const summaryElem = document.createElement("div");
  summaryElem.innerHTML = episode.summary;
  episodeContainer.appendChild(summaryElem);

  // Pad a number with leading zeros to make it two digits
  function pad(number) {
    return String(number).padStart(2, '0');
  }

  return episodeContainer;
}

window.onload = setup;