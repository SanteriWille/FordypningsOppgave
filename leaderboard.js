// Dummy data for demonstration
const leaderboardData = [
    { position: 1, name: 'Andreas', score: 50 },
    { position: 2, name: 'Simen', score: 45 },
    { position: 3, name: 'Emil', score: 40 },
    { position: 4, name: 'Daniel', score: 35 },
    { position: 5, name: 'Santeri', score: 30 }
  ];
  
  const backToGameBtn = document.getElementById('backToGameBtn');  // Updated button ID
  const leaderboardTable = document.querySelector('table'); // Select the table element
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Function to populate leaderboard with data
  function populateLeaderboard() {
    const tbody = leaderboardTable.querySelector('tbody') || leaderboardTable.appendChild(document.createElement('tbody'));
    tbody.innerHTML = ''; // Clear existing rows
  
    leaderboardData.forEach(entry => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.position}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Populate leaderboard when the page loads
  populateLeaderboard();
  
  // Back button functionality to return to the game page
  backToGameBtn.addEventListener('click', () => {
    window.location.href = 'spill.html';
  });
  
  // Logout button functionality
  logoutBtn.addEventListener('click', () => {
    // Add your logout logic here, for now, it just redirects
    window.location.href = 'login.html';  // Adjust this to the actual logout page or logic
  });
  