self.addEventListener("install", (evt) => {
  console.log("helo");
});

//Activate servie worker
self.addEventListener("activate", (evt) => {
  console.log("ddd");
});

//Fetch Event
self.addEventListener("fetch", (evt) => {
  console.log("fetc", evt);
});
