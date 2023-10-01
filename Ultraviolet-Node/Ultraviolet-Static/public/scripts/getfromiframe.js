cssColor = document.getElementById("css-link");
if(cssColor == "/style/search/light.css" || cssColor == "/style/search/frog.css"){
  locked = "https://img.icons8.com/sf-ultralight-filled/000000/lock.png"
  unlocked = "https://img.icons8.com/sf-ultralight-filled/000000/unlock.png"
} else {
  locked = "https://img.icons8.com/sf-ultralight-filled/ffffff/lock.png"
  unlocked = "https://img.icons8.com/sf-ultralight-filled/ffffff/unlock.png"
}

function checkIframeSSL() {
  const iframe = document.querySelector(".iframe-container.active iframe");
  if (iframe) {
    decryptedURL = decryptURL(iframe.contentWindow.location.href);
    if (decryptedURL == "Page Not Loaded") {
      return;
    }
    const iframeUrl = new URL(decryptedURL);
    const lockIcon = document.getElementById("lock-icon");
    if (iframeUrl.protocol === "https:") {
      // If the protocol is HTTPS, set the lock icon to a locked image
      lockIcon.innerHTML = `<img src="${locked}" alt="Locked">`;
    } else {
      // If the protocol is not HTTPS, set the lock icon to an unlocked image
      lockIcon.innerHTML = `<img src="${unlocked}" alt="Unlocked">`;
    }
  }
}

function getFavicon(iframeURL) {
  finalURL = decryptURL(iframeURL)     
  if(finalURL == "Page Not Loaded") {
    return "https://icons8.com/icon/53372/internet"
  }
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${finalURL}&size=16`
}