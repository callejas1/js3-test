/*
  This list gives the ids of all the great houses that we want to look up.
  It should be inserted into the html above all the other files to ensure it is available
*/
const houseIdList = [
  7, // Eyrie
  17, // Baratheon
  169, // Greyjoy
  229, // Lannister
  362, // Stark
  378, // Targaryen
  395, // Tully
  398, // Tyrell
];

const killBtn = document.getElementById('kill-random-lord-button');
let houseListDiv = document.getElementById('got-house-list');

async function displayAllHouses() {
  return houseIdList.forEach((el) => {
    fetchLord(el);
  });
}

async function fetchLord(i) {
  // empty div to append fetched data later
  houseListDiv.innerHTML = '';
  try {
    const getLords = await fetch(
      'https://anapioficeandfire.com/api/houses/' + i,
    );
    // Send response if status OK
    if (getLords.ok) {
      // convert to JS object
      const response = await getLords.json();
      const fetchLord = await fetch(`${response.currentLord}`);
      // second fetch request to get lord name
      if (response.currentLord) {
        let response2 = await fetchLord.json(); // convert to JS object
        // append house name to DOM
        houseListDiv.innerHTML += `
          <div class="got-house">
            <h1 class="got-house__title">${response.name}</h1>
            <span class="got-house__current-lord">${response2.name}</span>
          </div>
          `;
      } else if (response.currentLord === '') {
        // look  for the first sworn member to be placed as lord if house does not have a current lord
        const fetchLord = await fetch(`${response.swornMembers[0]}`);
        let response2 = await fetchLord.json(); // convert to JS object
        // append house name to DOM
        houseListDiv.innerHTML += `
          <div class="got-house">
            <h1 class="got-house__title">${response.name}</h1>
            <span class="got-house__current-lord">${response2.name}</span>
          </div>
          `;
      }
    } else {
      // throw error if network fails
      throw new Error();
    }
  } catch (err) {
    alert(err);
  }
}

displayAllHouses();

async function getSwornMember(x) {
  // fetch the info from random lord when button clicked
  const fetchSworn = await fetch(
    'https://anapioficeandfire.com/api/houses/' + x,
  );
  // if ok, get random replacement
  if (fetchSworn.ok) {
    const res = await fetchSworn.json(); // convert to JS obj
    const swornMemberArray = res.swornMembers; // will push fetched list to arr
    const membersArr = [];
    membersArr.push(swornMemberArray);
    return membersArr[0];
  }
}

async function killLord() {
  const lordReplacement = document.getElementsByTagName('span');
  // empty the current lord name
  lordReplacement.innerHTML = '';
  // get a random <span> tag
  const randomSpan = Math.floor(Math.random() * lordReplacement.length);
  // random house ID to fetch new sworn members
  const i = houseIdList[Math.floor(Math.random() * houseIdList.length)];
  const replacement = await getSwornMember(i);
  const randomMember = Math.floor(Math.random() * replacement.length);
  // this will fetch a random member but I am not sure how to get the sworn members of the specific house to replace accordingly
  const fetchAgain = await fetch(replacement[randomMember])
    .then((res) => res.json())
    .then((data) => data.name);
  lordReplacement[randomSpan].innerHTML = fetchAgain;
}

killBtn.addEventListener('click', killLord);
