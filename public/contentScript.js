// Content script to modify LeetCode difficulty tags
let customText = "Asmit";
let customColor = "inherit"; // Default color

function updateDifficultyTags() {
  const difficultyTags = document.querySelectorAll(
    '.text-difficulty-medium, .text-difficulty-easy, .text-difficulty-hard'
  );

  difficultyTags.forEach(tag => {
    tag.textContent = customText;
    tag.style.color = customColor;
  });
}

// Run the function when the content script loads
updateDifficultyTags();

// Set up a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      updateDifficultyTags();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateTags") {
    customText = request.text;
    customColor = request.color;
    updateDifficultyTags();
  }
});