document.addEventListener("DOMContentLoaded", () => {
  const userId = "uniqueUserId"; // Replace with actual user ID logic

  // Initialize variables
  let totalTaps = 0;
  let remainingTaps = 100000; // Initial taps

  // Elements
  const coin = document.getElementById("coin");
  const scoreDisplay = document.getElementById("score");
  const remainingDisplay = document.getElementById("remaining");
  const progressBar = document.getElementById("progress");

  // Fetch user data on load
  fetch(`/api/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.score !== undefined) {
        totalTaps = data.score;
        remainingTaps = 100000 - totalTaps;
        updateDisplay();
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));

  // Update display
  function updateDisplay() {
    scoreDisplay.textContent = totalTaps.toLocaleString();
    remainingDisplay.textContent = remainingTaps.toLocaleString();
    progressBar.style.width = `${(remainingTaps / 100000) * 100}%`;
  }

  // Handle coin click
  coin.addEventListener("click", () => {
    if (remainingTaps > 0) {
      totalTaps++;
      remainingTaps--;
      updateDisplay();
      saveUserScoreToMongoDB(1); // Send only the increment value

      // Create a floating number element
      const floatingNumber = document.createElement("div");
      floatingNumber.className = "floating-number";
      floatingNumber.textContent = "+1";
      document.body.appendChild(floatingNumber);

      // Position the floating number at the coin
      const coinRect = coin.getBoundingClientRect();
      floatingNumber.style.left = `${coinRect.left + coinRect.width / 2}px`;
      floatingNumber.style.top = `${coinRect.top}px`;

      // Animate the floating number
      setTimeout(() => {
        floatingNumber.style.top = `${coinRect.top - 50}px`;
        floatingNumber.style.opacity = "0";
      }, 100);

      // Remove the floating number after animation
      setTimeout(() => {
        document.body.removeChild(floatingNumber);
      }, 1000);
    }
  });

  // Simulate saving user's score to MongoDB
  function saveUserScoreToMongoDB(increment) {
    // Replace with actual fetch or AJAX call to your Node.js server
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, score: increment }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error saving user score:", error));
  }
});
