document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.tvmaze.com';

    // Function to fetch shows listing
    function fetchShowsListing() {
        fetch(`${apiUrl}/shows`)
            .then(response => response.json())
            .then(data => {
                const showsListingSection = document.getElementById('shows-listing');
                const showSelector = document.getElementById('show-selector');

                showsListingSection.innerHTML = ''; // Clear previous content
                showSelector.innerHTML = '<option value="placeholder">Select a show...</option>'; // Clear previous options

                // Populate dropdown menu with show titles and append show cards
                data.forEach(show => {
                    const showCard = createShowCard(show);
                    showsListingSection.appendChild(showCard);

                    const option = document.createElement('option');
                    option.value = show.id;
                    option.textContent = show.name;
                    showSelector.appendChild(option);
                });

                showsListingSection.style.display = 'block';
            })
            .catch(error => console.error('Error fetching shows:', error));
    }

    // Function to create show card
    function createShowCard(show) {
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');
        showCard.dataset.showId = show.id;
        showCard.innerHTML = `
            <h3>${show.name}</h3>
            <img src="${show.image.medium}" alt="${show.name}" />
            <p>${show.summary}</p>
            <p><strong>Genres:</strong> ${show.genres.join(', ')}</p>
            <p><strong>Status:</strong> ${show.status}</p>
            <p><strong>Rating:</strong> ${show.rating.average}</p>
            <p><strong>Runtime:</strong> ${show.runtime} minutes</p>
        `;
        showCard.addEventListener('click', () => {
            fetchEpisodes(show.id);
            document.getElementById('shows-listing').style.display = 'none';
        });
        return showCard;
    }

    // Function to fetch episodes for a show
    function fetchEpisodes(showId) {
        fetch(`${apiUrl}/shows/${showId}/episodes`)
            .then(response => response.json())
            .then(episodes => {
                const episodesListingSection = document.getElementById('episodes-listing');
                episodesListingSection.style.display = 'block';

                makePageForEpisodes(episodes);
                populateEpisodeDropdown(episodes);
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }

    // Function to make page for episodes
    function makePageForEpisodes(episodeList) {
        const rootElem = document.getElementById("episode-list");
        rootElem.innerHTML = ""; // Clear previous episodes

        // Create and append episode cards
        episodeList.forEach(episode => {
            const episodeCard = createEpisodeCard(episode);
            rootElem.appendChild(episodeCard);
        });
    }

    // Function to create episode card
    function createEpisodeCard(episode) {
        const episodeCard = document.createElement('div');
        episodeCard.classList.add('episode-card');
        episodeCard.dataset.episodeId = episode.id;
        episodeCard.innerHTML = `
            <h4>${episode.name}</h4>
            <p>Season ${episode.season} | Episode ${episode.number}</p>
            <p>${episode.summary}</p>
            <img src="${episode.image.medium}" alt="${episode.name}" />
        `;
        return episodeCard;
    }

    // Function to populate dropdown menu for episodes
    function populateEpisodeDropdown(episodes) {
        const episodeSelector = document.getElementById('episode-selector');

        // Clear previous options
        episodeSelector.innerHTML = '<option value="placeholder">Select an episode...</option>';

        // Populate dropdown with episode titles
        episodes.forEach(episode => {
            const option = document.createElement('option');
            option.value = episode.id;
            option.textContent = `${episode.name} - S${episode.season}E${episode.number}`;
            episodeSelector.appendChild(option);
        });
    }

    // Function to display only the selected episodes card
    function showSelectedEpisodeCard(selectedEpisodeId) {
        const episodeCards = document.querySelectorAll('.episode-card');

        episodeCards.forEach(card => {
            if (card.dataset.episodeId === selectedEpisodeId) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listener for search bar
    // Event listener for search bar
// Function to perform search
function performSearch(searchTerm) {
    // Clear previous content
    const showsListingSection = document.getElementById('shows-listing');
    showsListingSection.innerHTML = '';

    // Fetch shows matching the search term
    fetch(`${apiUrl}/search/shows?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(showData => {
                const show = showData.show;
                const showCard = createShowCard(show);
                showsListingSection.appendChild(showCard);
            });
        })
        .catch(error => console.error('Error fetching search results:', error));
}

// Event listener for search bar
document.getElementById('search-bar').addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();
    if (searchTerm.length > 0) {
        performSearch(searchTerm);
    } else {
        // If the search bar is empty, fetch all shows
        fetchShowsListing();
    }
});



    // Event listener for back to shows button
    document.getElementById('back-to-shows-btn').addEventListener('click', () => {
        document.getElementById('episodes-listing').style.display = 'none';
        fetchShowsListing();
    });

    // Event listener for show selector
    document.getElementById('show-selector').addEventListener('change', function () {
        const selectedShowId = this.value;
        if (selectedShowId !== 'placeholder') {
            fetchEpisodes(selectedShowId);
            showSelectedShowCard(selectedShowId);
        }
    });

    // Event listener for episode selector
    document.getElementById('episode-selector').addEventListener('change', function () {
        const selectedEpisodeId = this.value;
        if (selectedEpisodeId !== 'placeholder') {
            showSelectedEpisodeCard(selectedEpisodeId);
        }
    });

    // Function to display only the selected show's card
    function showSelectedShowCard(selectedShowId) {
        const showsListingSection = document.getElementById('shows-listing');
        const showCards = showsListingSection.querySelectorAll('.show-card');

        showCards.forEach(card => {
            if (card.dataset.showId === selectedShowId) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initial fetch for shows listing
    fetchShowsListing();
});
