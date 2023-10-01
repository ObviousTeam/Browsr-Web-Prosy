function UpdateSearchHistory() {
  const iframeContainer = document.getElementById(currentTab);
  const iframe = iframeContainer.querySelector('iframe');
  decryptedURL = decryptURL(iframe.contentWindow.location.href);
  if (decryptedURL === "Page Not Loaded") {
    return;
  }

  try {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Create a dictionary object with tab name and date
    const historyEntry = {
      tab: currentTab, // Assuming currentTab is defined somewhere
      date: new Date().toLocaleString(), // You can use the actual timestamp here
      url: decryptedURL,
    };

    // Add the dictionary to the search history list
    searchHistory.unshift(historyEntry);

    const maxHistoryLength = 100;
    if (searchHistory.length > maxHistoryLength) {
      searchHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  } catch (err) {
    console.error(err);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

function displaySearchHistory() {
  const searchHistoryContainer = document.getElementById("searchHistoryItems");

  try {
    // Get the search history from localStorage
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Clear the existing search history items in the container
    searchHistoryContainer.innerHTML = '';

    // Iterate over the search history and create HTML elements for each item
    searchHistory.forEach((entry, index) => {
      const searchHistoryItem = document.createElement("div");
      searchHistoryItem.classList.add("search-history-item");

      const searchTerm = document.createElement("div");
      searchTerm.classList.add("search-term");
      searchTerm.textContent = entry.url;

      const timestamp = document.createElement("div");
      timestamp.classList.add("timestamp");
      
      // Use the date from the dictionary instead of the current date
      timestamp.textContent = entry.date;

      searchHistoryItem.appendChild(searchTerm);
      searchHistoryItem.appendChild(timestamp);

      searchHistoryContainer.appendChild(searchHistoryItem);
    });
  } catch (err) {
    console.error(err);
  }
}

function filterSearchHistory() {
  const searchHistoryContainer = document.getElementById("searchHistoryItems");
  const searchItems = searchHistoryContainer.getElementsByClassName("search-history-item");
  const searchTerm = searchBar.value.toLowerCase();

  // Iterate over the search history items and show/hide based on the search term
  Array.from(searchItems).forEach((item) => {
    const searchTermElement = item.querySelector(".search-term");
    const text = searchTermElement.textContent.toLowerCase();

    if (text.includes(searchTerm)) {
      item.classList.remove("hidden")
      item.classList.add("displayed")
    } else {
      item.classList.remove("displayed")
      item.classList.add("hidden");
    }
  });
}

function filterSearchHistoryDate() {
  const date = new Date()
  const searchHistoryContainer = document.getElementById("searchHistoryItems");
  const searchItems = searchHistoryContainer.getElementsByClassName("search-history-item");

  // Get the date tab that is currently active
  const activeTab = document.querySelector(".tab.active").textContent.toLowerCase();

  Array.from(searchItems).forEach((item) => {
    const timestampElement = item.querySelector(".timestamp");
    const timestampText = timestampElement.textContent.toLowerCase();
    const isMatchingDate = (activeTab === "all") || (activeTab === "yesterday" && timestampText.includes(date.getDate() - 1)) || (activeTab === "today" && timestampText.includes(date.getDate()));

    if (isMatchingDate) {
      item.classList.remove("hidden")
      item.classList.add("displayed")
    } else {
      item.classList.remove("displayed")
      item.classList.add("hidden")
    }
  });
}
