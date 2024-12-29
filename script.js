// Login Screen
const loginScreen = document.getElementById('login-screen');
const notebookScreen = document.getElementById('notebook-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const displayUsername = document.getElementById('display-username');

// Diary Functionality
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const textArea = document.querySelector('.diary-entry');
const dateList = document.getElementById('date-list');

// Placeholder for diary entries
let diaryEntries = {};
let currentDate = new Date().toISOString().split('T')[0];
let currentPage = currentDate;

// Save and display diary entries
function displayEntry(date) {
  textArea.value = diaryEntries[date] || "";
  currentPage = date;
}

// Populate date list
function populateDateList() {
  dateList.innerHTML = "";
  Object.keys(diaryEntries).forEach((date) => {
    const li = document.createElement('li');
    li.textContent = date;
    li.addEventListener('click', () => {
      flipToDate(date);
    });
    dateList.appendChild(li);
  });
}

// Flip animation
function flipToDate(date) {
  const pages = document.querySelector('.pages');
  pages.style.transition = "transform 1s ease-in-out";
  pages.style.transform = "rotateY(180deg)";
  setTimeout(() => {
    displayEntry(date);
    pages.style.transition = "none";
    pages.style.transform = "rotateY(0)";
  }, 1000);
}

// Handle login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    displayUsername.textContent = username;
    loginScreen.style.animation = "fadeOut 1.5s ease-in-out forwards";
    setTimeout(() => {
      loginScreen.style.display = 'none';
      notebookScreen.style.display = 'block';
      notebookScreen.style.animation = "fadeIn 1.5s ease-in-out";
      displayEntry(currentDate);
      populateDateList();
    }, 1500);
  }
});

// Save diary entry on input
textArea.addEventListener('input', () => {
  diaryEntries[currentPage] = textArea.value;
  populateDateList();
});

// Navigation buttons
prevButton.addEventListener('click', () => {
  const dates = Object.keys(diaryEntries).sort();
  const currentIndex = dates.indexOf(currentPage);
  if (currentIndex > 0) {
    flipToDate(dates[currentIndex - 1]);
  }
});

nextButton.addEventListener('click', () => {
  const dates = Object.keys(diaryEntries).sort();
  const currentIndex = dates.indexOf(currentPage);
  if (currentIndex < dates.length - 1) {
    flipToDate(dates[currentIndex + 1]);
  }
});
