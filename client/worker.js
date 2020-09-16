console.log("Service worker loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  //   console.log(data);
  console.log("push has been received");
  self.registration.showNotification(data.title, {
    body: data.advice,

    icon:
      "https://img.freepik.com/free-vector/bitcoin-sticker-label-design-vector_1017-13709.jpg?size=338&ext=jpg",
  });
});

self.addEventListener("notificationclick", function (event) {
  console.log("clicked");
  let url = "https://login.blockchain.com/en/#/login";
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
