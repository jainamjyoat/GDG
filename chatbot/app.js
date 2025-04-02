document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addChatMessage('User', userInput);
        fetchVideos(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addChatMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'mb-2';
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchVideos(query) {
    const apiKey = 'AIzaSyAgwzEcJOJrgwaVyq1QOEfBvtah_D4TfJI'; // Replace with your actual API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}+education+tutorial&type=video&maxResults=5&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const videos = data.items.filter(item => {
            const title = item.snippet.title.toLowerCase();
            const description = item.snippet.description.toLowerCase();
            return ['tutorial', 'lesson', 'course', 'educational', 'how to', 'learn', 'study'].some(keyword => title.includes(keyword) || description.includes(keyword));
        });

        if (videos.length > 0) {
            addChatMessage('Bot', 'Here are some educational videos:');
            videos.forEach(video => {
                addChatMessage('Bot', `<a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">${video.snippet.title}</a>`);
            });
        } else {
            addChatMessage('Bot', 'Sorry, I couldn\'t find any educational videos on that topic.');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        addChatMessage('Bot', 'There was an error fetching videos. Please try again later.');
    }
}