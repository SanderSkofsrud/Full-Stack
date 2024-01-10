let count = 0;

function increaseCount() {
    count++;
    document.getElementById('countDisplay').textContent = count;
}

function toggleContent() {
    const content = document.getElementById('toggleContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

const keywords = ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5", "Keyword6", "Keyword7", "Keyword8", "Keyword9", "Keyword10"];

function displayKeywords() {
    shuffleArray(keywords); // Blander listen
    const list = document.getElementById('keywordList');
    list.innerHTML = '';
    const listSize = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < listSize; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = keywords[i];
        list.appendChild(listItem);
    }
}

document.addEventListener('DOMContentLoaded', displayKeywords);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

