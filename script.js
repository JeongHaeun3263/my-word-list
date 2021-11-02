const inputItem = document.getElementById('input-word');
const wordList = document.querySelector('.word-list');
const addBtn = document.getElementById('add-word-btn');

const addWordToList = () => {
	const wordItem = document.createElement('li');
	const searchIcon = document.createElement('i');
	const deleteIcon = document.createElement('i');
	const iconContainer = document.createElement('div');
	wordItem.textContent = inputItem.value;
	wordItem.classList.add('word-item');
	iconContainer.classList.add('icon-container');
	searchIcon.classList.add('fas', 'fa-search');
	deleteIcon.classList.add('fas', 'fa-trash-alt');
	wordList.appendChild(wordItem);
	wordItem.appendChild(iconContainer);
	iconContainer.appendChild(searchIcon);
	iconContainer.appendChild(deleteIcon);
	inputItem.value = '';
};

addBtn.addEventListener('click', addWordToList);
