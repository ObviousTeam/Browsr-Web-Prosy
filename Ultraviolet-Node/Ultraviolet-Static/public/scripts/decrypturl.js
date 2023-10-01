function decryptURL(iframeURL) {
  removeURL1 = iframeURL.split('/service/')
  if(removeURL1 == "about:blank") {
    return "Page Not Loaded"
  }
  return __uv$config.decodeUrl(removeURL1[1])
}
