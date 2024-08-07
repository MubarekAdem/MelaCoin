document.addEventListener("DOMContentLoaded", () => {
  const userId = "uniqueUserId"; // Replace with actual user ID logic

  // Elements
  const userNameElement = document.getElementById("userName");
  const userUsernameElement = document.getElementById("userUsername");
  const userScoreElement = document.getElementById("userScore");

  // Fetch user data
  fetch(`/api/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.name) {
        userNameElement.textContent = data.name;
      }
      if (data && data.username) {
        userUsernameElement.textContent = data.username;
      }
      if (data && data.score !== undefined) {
        userScoreElement.textContent = data.score.toLocaleString();
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
});
