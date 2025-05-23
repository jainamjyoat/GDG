const API_KEY = 'AIzaSyAgwzEcJOJrgwaVyq1QOEfBvtah_D4TfJI'; // Replace with your actual API key
const PLAYLIST_IDS = [
    'PLF_7kfnwLFCEbuqbwU9hyghx5vHpaBPRo', // Example playlist ID 1
    'PLJz-qWiTZc9bcIdwRV5tNJxNGAQRoV32M', // Example playlist ID 2
    'PLCtUyOrCJbxzVvruhcM52GV5VfzHaUcZK',
    'PLJz-qWiTZc9YJR_LhoM9vLiUB1Dm9IzzE',
    'PLCtUyOrCJbxzVvruhcM52GV5VfzHaUcZK',
    'PLCtUyOrCJbxxw9tfMYxtnnOH4uSp9cgiJ' // Add more playlist IDs as needed
];

async function fetchPlaylistThumbnail(playlistId) {
    const playlistResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`);
    const playlistData = await playlistResponse.json();
    displayPlaylistThumbnail(playlistId, playlistData.items[0].snippet);
}

async function fetchVideosForPlaylist(playlistId, playlistTitle) {
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${API_KEY}`);
    const videoData = await videoResponse.json();
    displayVideos(videoData.items, playlistTitle);
}

function displayVideos(videos, playlistTitle) {
    const container = document.getElementById('playlist-container');

    const headerElement = document.createElement('h2');
    headerElement.textContent = playlistTitle;
    headerElement.classList.add('playlist-header');
    container.appendChild(headerElement);

    const videoListElement = document.createElement('div');
    videoListElement.classList.add('video-list', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'gap-6');

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('playlist-item', 'flex', 'flex-col', 'items-center', 'justify-center', 'p-4', 'bg-gray-800', 'rounded-lg', 'shadow-lg');
        videoElement.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" class="rounded-lg">
            <div class="playlist-item-title mt-2 text-white text-center">${video.snippet.title}</div>
        `;
        videoListElement.appendChild(videoElement);
    });

    container.appendChild(videoListElement);
}

function displayPlaylistThumbnail(playlistId, snippet) {
    const container = document.getElementById('playlist-container');

    const thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('playlist-item', 'flex', 'flex-col', 'items-center', 'justify-center', 'p-4', 'bg-gray-800', 'rounded-lg', 'shadow-lg');
    thumbnailElement.addEventListener('click', () => {
        // Redirect to a new page when the thumbnail is clicked
        window.location.href = `playlist.html?playlistId=${playlistId}`;
    });

    thumbnailElement.innerHTML = `
        <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}" class="cursor-pointer rounded-lg">
        <div class="playlist-item-title text-center mt-2 text-white">${snippet.title}</div>
    `;
    container.appendChild(thumbnailElement);
}

PLAYLIST_IDS.forEach(playlistId => {
    fetchPlaylistThumbnail(playlistId);
});