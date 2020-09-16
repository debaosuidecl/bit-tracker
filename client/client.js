const publicvapidkey =
  "BJSWZuhk5KSXEycvEUzlSAZpgH_QBiV1cf89f3uhz_KQBPXALTQS6EKGX5TaBR63btaNDQFxHmUGEpoyduYItg4";

//check for service worker

if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

//REGISTER SW, REGISTER PUSH, SEND THE PUSH

async function send() {
  // REGISTER SW
  console.log("Registering the service worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service worker registered");

  // REGISTER PUSH
  //   const subscription = await register.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: urlBase64ToUint8Array(publicvapidkey),
  //   });
  //   console.log("push registered");
}

async function getbitprice() {
  const first = await fetch("https://blockchain.info/ticker");
  const response = await first.json();
  //   console.log();

  const bitcoinPrice = response.USD["15m"];

  document.querySelector(".bit").innerText =
    "$" + bitcoinPrice.toLocaleString();
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

getbitprice();
