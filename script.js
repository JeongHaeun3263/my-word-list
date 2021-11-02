const inputItem = document.getElementById('input-word');
const wordList = document.querySelector('.word-list');
const addBtn = document.getElementById('add-word-btn');
const modal = document.querySelector('.word-modal');
const definitionList = document.querySelector('.definition-list');
const closeBtn = document.querySelector('.close-btn');

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

const deleteWordItem = (e) => {
	e.target.parentElement.parentElement.remove();
};

const showWordModal = () => {
	modal.classList.add('show');
};

const closeModal = () => {
	modal.classList.remove('show');
};

const searchWord = async (e) => {
	const word = e.target.parentElement.parentElement.textContent;
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			result.map((item) => {
				item.meanings.map((item) => {
					item.definitions.map((item) => {
						console.log(item.definition);
						const definitionItem = document.createElement('li');
						const listIcon = document.createElement('i');
						definitionItem.classList.add('definition-item');
						definitionItem.textContent = item.definition;
						listIcon.classList.add('fas', 'fa-check-square', 'list-icon');
						definitionList.appendChild(listIcon);
						definitionList.appendChild(definitionItem);
					});
				});
			});
		})
		.catch((error) => console.log('error', error));
};

addBtn.addEventListener('click', addWordToList);
inputItem.addEventListener('keypress', (e) => {
	if (e.keyCode == 13) {
		addWordToList();
	}
});
wordList.addEventListener('click', (e) => {
	if (e.target.className == 'fas fa-trash-alt') {
		deleteWordItem(e);
	}

	if (e.target.className == 'fas fa-search') {
		searchWord(e);
		showWordModal();
	}
});
closeBtn.addEventListener('click', closeModal);
