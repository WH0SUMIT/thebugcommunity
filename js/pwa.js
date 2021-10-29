if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("hello pwa", reg))
    .catch((err) => console.log("erroe pwa", err));
}
