let tabCounter = 0;
let currentTab = 0;
let tabs = [];


function updateLocalStorage() {
	const tabsData = tabs.map(tab => ({
		id: tab.id,
		url: tab.container.querySelector('iframe').contentWindow.location.href,
		name: tab.container.querySelector('iframe').contentDocument.title,
		favicon: getFavicon(tab.container.querySelector('iframe').contentWindow.location.href),
	}));
	localStorage.setItem('tabsData', JSON.stringify(tabsData));
}


function openTab(tabId) {
	tabs.forEach(tab => {
		const tabContainer = document.getElementById(tab.id);
		if (tab.id === tabId) {
			tabContainer.classList.add('active');
			currentTab = tabId;
		} else {
			tabContainer.classList.remove('active');
		}
	});
	iframeUpdated()
}

function createNewTab() {
	tabCounter++;
	const tabList = document.getElementById('tabList');
	const newTab = document.createElement('div');
	newTab.classList.add('tab');
	const tabId = `tab${tabCounter}`;
	newTab.id = tabId + 'button';
	newTab.setAttribute("onclick", `openTab('tab${tabCounter}')`);
	newTab.innerHTML = `
    <img src="../images/nofavicon.png" alt="Favicon">
    <div class="tab-title">Tab ${tabCounter}</div>
    <div class="tab-close" onclick="closeTab('${tabId}')">x</div>
  `;
	tabList.appendChild(newTab);

	const iframelist = document.getElementById('iframelist');
	searchUrl = __uv$config.encodeUrl(localStorage.getItem("searchUrl"))
	const newTabContainer = document.createElement('div');
	newTabContainer.classList.add('iframe-container', 'active');
	newTabContainer.id = tabId;
	newTabContainer.innerHTML = `
    <iframe onload="iframeUpdated()" src="/uv/service/${searchUrl}/"></iframe>
  `;
	iframelist.appendChild(newTabContainer);

	newTabContainer.querySelector('iframe').contentDocument.title = "New Tab";

	tabs.push({
		id: tabId,
		button: newTab,
		container: newTabContainer
	});

	openTab(tabId);

	// Store tab information in localStorage
	updateLocalStorage();
}


function closeTab(tabId) {
	const tabToRemoveIndex = tabs.findIndex(tab => tab.id === tabId);
	if (tabToRemoveIndex !== -1) {
		const tabToRemove = tabs[tabToRemoveIndex];
		const iframelist = document.getElementById('iframelist');

		if (tabToRemove.container) {
			iframelist.removeChild(tabToRemove.container);
		}

		tabToRemove.button.remove();
		tabs.splice(tabToRemoveIndex, 1);

		if (tabs.length > 0) {
			openTab(tabs[tabs.length - 1].id);
		}
	}
	updateLocalStorage();
}


function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

function setFavicon() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	currentTabIdChild = findFirstDescendant(`${currentTab}button`, `img`)
	currentTabIdChild.src = getFavicon(iframe.contentWindow.location.href);
}

function performSearchAndLoadIframe(tabId, searchQuery, search) {
    const iframeContainer = document.getElementById(tabId);
    searchUrl = localStorage.getItem("searchUrl");
    const iframe = iframeContainer.querySelector('iframe');

    if (isValidHttpUrl(search)) {
        // If the search is a valid URL, encrypt it and load it in the iframe
        const encryptedURL = `/uv/service/${__uv$config.encodeUrl(search)}`;
        iframe.src = encryptedURL;
    } else {
        // If it's not a valid URL, assume it's a search query and construct the URL
        const searchURL = searchUrl + '/search?q=' + searchQuery;
        const encryptedURL = `/uv/service/${__uv$config.encodeUrl(searchURL)}`;
        iframe.src = encryptedURL;
    }

    updateLocalStorage();
}

// Event listener for search bar input
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		const searchQuery = searchBar.value;
		actualsearch = searchQuery.split("==/")
		performSearchAndLoadIframe(currentTab, searchQuery, actualsearch[0]);
	}
});

function truncateString(inputString, maxLength) {
	if (inputString.length <= maxLength) {
		// If the input string is already within the length limit, return it as is
		return inputString;
	} else {
		// If the input string is longer than the specified length, truncate it and add "..."
		return inputString.slice(0, maxLength - 3) + "...";
	}
}

function findFirstDescendant(parent, tagname) {
	parent = document.getElementById(parent);
	var descendants = parent.getElementsByTagName(tagname);
	if (descendants.length)
		return descendants[0];
	return null;
}

function updateSearchBar() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	realURL = decryptURL(iframe.contentWindow.location.href)
	searchBar.value = realURL
	updateLocalStorage();
}

function updateTabTitle() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	currentTabIdChild = findFirstDescendant(`${currentTab}button`, `div`)
	currentTabIdChild.textContent = truncateString(iframe.contentDocument.title, 8)
}

function goBack() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	iframe.contentWindow.history.back();
	updateSearchBar()
	updateLocalStorage();
}

function goForward() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	iframe.contentWindow.history.forward();
	updateSearchBar()
	updateLocalStorage();
}

function reload() {
	const iframeContainer = document.getElementById(currentTab);
	const iframe = iframeContainer.querySelector('iframe');
	iframe.contentWindow.location.reload();
}

function settings() {
	window.location.href = "/settings.html"
}

function browser() {
	window.location.href = "/"
}

const cssLink = document.getElementById("css-link");

colorTheme = localStorage.getItem("colorTheme")
if (colorTheme == null) {
	cssLink.href = "/style/search/dark.css";
} else {
	cssLink.href = `/style/search/${colorTheme}.css`;
}

searchUrl = localStorage.getItem("searchUrl")
if (searchUrl == null) {
	localStorage.setItem("searchUrl", "https://google.com")
}

window.addEventListener('load',() => {
	const storedTabsData = localStorage.getItem('tabsData');
	if (storedTabsData != null) {
		const parsedTabsData = JSON.parse(storedTabsData);
		parsedTabsData.forEach(tabData => {
			createNewTab();
			const tabContainer = document.getElementById(tabData.id);
			const iframe = tabContainer.querySelector('iframe');
			iframe.src = tabData.url;
			currentTabButtonChild = findFirstDescendant(`${tabData.id}button`, `div`)
			currentTabButtonChild.textContent = truncateString(tabData.name, 8)
			currentTabIdChild = findFirstDescendant(`${tabData.id}button`, `img`)
			currentTabIdChild.src = tabData.favicon;
		});
		openTab(parsedTabsData[0].id);
	} else {
		createNewTab();
		createNewTab();
		openTab('tab1');
		updateLocalStorage();
	}
});

function iframeUpdated() {
	updateSearchBar()
	checkIframeSSL()
	updateTabTitle()
	setFavicon()
    UpdateSearchHistory()
}