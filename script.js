const saveButton = document.getElementById('save-btn');
const clearButton = document.getElementById('clear-btn');
const textarea = document.getElementById('diary-entry');

// Save button functionality
saveButton.addEventListener('click', () => {
  const entry = textarea.value;
  if (entry.trim() === '') {
    alert("Your diary is empty! Write something magical ✨");
    return;
  }
  alert("Entry saved! 💾: " + entry); // Placeholder for real save logic
  textarea.value = ''; // Clear textarea after saving
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  textarea.value = '';
});
