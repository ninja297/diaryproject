document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const notebookContainer = document.getElementById('notebook-container');
  const usernameInput = document.getElementById('username');
  const loginButton = document.getElementById('login-button');
  const welcomeMessage = document.getElementById('welcome-message');
  const cover = document.getElementById('cover');
  const diaryText = document.getElementById('diary-text');
  const saveButton = document.getElementById('save-button');
  const clearButton = document.getElementById('clear-button');
  const entryList = document.getElementById('entry-list');

  // Local storage for diary entries
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || {};

  // Login Functionality
  loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('username', username);
      welcomeMessage.textContent = `Welcome, ${username}!`;
      loginScreen.style.display = 'none';
      notebookContainer.style.display = 'block';
    } else {
      alert('Please enter a valid username!');
    }
  });

  // Notebook Open Animation
  cover.addEventListener('click', () => {
    cover.classList.add('open');
  });

  // Save Diary Entry
  saveButton.addEventListener('click', () => {
    const date = new Date().toLocaleDateString();
    const text = diaryText.value.trim();
    if (text) {
      entries[date] = text;
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
      updateEntryList();
      alert('Diary entry saved!');
    } else {
      alert('Diary entry cannot be empty!');
    }
  });

  // Clear Diary Text
  clearButton.addEventListener('click', () => {
    diaryText.value = '';
  });

  // Update Entry List
  const updateEntryList = () => {
    entryList.innerHTML = '';
    Object.keys(entries).forEach((date) => {
      const listItem = document.createElement('li');
      listItem.textContent = date;
      listItem.addEventListener('click', () => {
        diaryText.value = entries[date];
      });
      entryList.appendChild(listItem);
    });
  };

  // Load Saved Entries
  const init = () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      welcomeMessage.textContent = `Welcome, ${savedUsername}!`;
      loginScreen.style.display = 'none';
      notebookContainer.style.display = 'block';
      updateEntryList();
    }
  };

  init();
});
