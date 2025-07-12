export function loadFbSdk() {
  if (window.FB) return;

  window.fbAsyncInit = function () {
    window.FB.init({
      xfbml: true,
      version: "v19.0",
    });
  };

  const script = document.createElement("script");
  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}


