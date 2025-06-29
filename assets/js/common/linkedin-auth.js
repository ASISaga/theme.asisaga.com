// When the user clicks the button, send a request to the Azure Function to get the LinkedIn login URL
// To request an authorization code, direct the member's browser to LinkedIn's OAuth 2.0 authorization page,
// where the member either accepts or denies your application's permission request.
// 
// Once the request is made, one of the following occurs:
// If it is a first-time request, the permission request timed out, or was manually revoked by the member:
// the browser is redirected to LinkedIn's authorization consent window.
// 
// If there is an existing permission grant from the member:
// the authorization screen is bypassed and the member is immediately redirected to the URL provided in the redirect_uri query parameter.

document.getElementById("linkedin-signin").addEventListener("click", async () => {
  const response = await fetch("https://<your-static-web-app>.azurestaticapps.net/api/linkedin-auth");
  const data = await response.json();

  // Redirect browser to LinkedIn OAuth 2.0 authorization page
  window.location.href = data.loginUrl; 
});
