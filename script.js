document.getElementById('status').addEventListener('change', function() {
  var developerOptions = document.getElementById('developerOptions');
  var status = document.getElementById('status').value;
  developerOptions.style.display = status === 'developer' ? 'block' : 'none';
});

document.getElementById('allocationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var status = document.getElementById('status').value;
  var proficiency = '';

  if (status === 'developer') {
    proficiency = document.getElementById('proficiency').value;
  }

  allocateRoom(name, status, proficiency);

  document.getElementById('allocationForm').reset();
});

function allocateRoom(name, status, proficiency) {
  var allocationRows = document.getElementById('allocationRows');

  // Check if the maximum number of users has been reached
  if (allocationRows.childElementCount >= 25) {
    alert('Maximum number of users reached.');
    return;
  }

  // Check if there's already a user with the same proficiency in the same room
  var existingUsers = allocationRows.getElementsByTagName('tr');
  var conflictingUsers = Array.from(existingUsers).filter(function(userRow) {
    var userProficiency = userRow.querySelector('.proficiency').textContent;
    var userRoom = userRow.querySelector('.room').textContent;
    return userProficiency === proficiency && userRoom === getRoomNumber(status);
  });

  if (conflictingUsers.length >= 3) {
    alert('Cannot allocate more than 3 developers with the same proficiency in the same room.');
    return;
  }

  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="room">${getRoomNumber(status)}</td>
    <td>${name}</td>
    <td>${status}</td>
    <td class="proficiency">${proficiency}</td>
  `;

  allocationRows.appendChild(newRow);
}

function getRoomNumber(status) {
  var roomNumber = '';

  switch (status) {
    case 'facilitator':
      roomNumber = 'Conference Room';
      break;
    case 'developer':
      var developerRows = document.querySelectorAll('#allocationRows tr');
      var roomCount = Math.floor(developerRows.length / 3) + 1;
      roomNumber = `Bedroom ${roomCount}`;
      break;
  }

  return roomNumber;
}
