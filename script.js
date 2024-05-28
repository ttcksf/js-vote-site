const socket = io('https://node-vote-app.onrender.com');

const progressBoxes = document.querySelectorAll('.progress-box');
const percent = document.querySelectorAll('.percent-tag');
const totalVotes = document.querySelector('#total-votes');

for (let i = 0; i < progressBoxes.length; i++) {
  const elem = progressBoxes[i];
  elem.addEventListener('click', () => {
    addVote(elem, elem.id);
  });
}

let vote = false;

const addVote = (elem, id) => {
  if (vote) {
    return;
  }
  let lang = id;
  socket.emit('send-vote', lang);
  vote = true;
  elem.classList.add('active');
};

socket.on('receive-vote', (data) => {
  updatePolls(data);
});
socket.on('update', (data) => {
  updatePolls(data);
});

const updatePolls = (data) => {
  let votingObj = data.votingPolls;
  let total = data.total;
  totalVotes.innerHTML = total;
  for (let i = 0; i < percent.length; i++) {
    let vote = votingObj[progressBoxes[i].id];
    let setWidth = Math.round((vote / total) * 100);
    const elem = document
      .querySelector(`#${progressBoxes[i].id}`)
      .querySelector('.percent-tag');
    elem.setAttribute('data', `${!setWidth ? 0 : setWidth}%`);
    elem.style.width = `${!setWidth ? 0 : setWidth}%`;
  }
};
