const colorThemeSelect = document.getElementById("colorThemeSelect");
const searchEngineSelect = document.getElementById("searchEngine");
const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", () => {
  const selectedColorTheme = colorThemeSelect.value;
  const selectedSearchEngine = searchEngineSelect.value;
  localStorage.setItem("searchUrl", selectedSearchEngine)

  // Save the selected settings or perform other actions here
  localStorage.setItem('colorTheme', selectedColorTheme)
  cssLink.href = `style/search/${selectedColorTheme}.css`;
});

const cssLink = document.getElementById("css-link");

window.onload = function() {
  colorTheme = localStorage.getItem("colorTheme")
  if(colorTheme == null) {
    cssLink.href = "/style/search/dark.css";
  } else {
    cssLink.href = `style/search/${colorTheme}.css`;
  } 
}