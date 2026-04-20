const roles = [
  'Web Developer',
  'AI/ML Enthusiast'
];

let i = 0;
let j = 0;
let deleting = false;

const el = document.getElementById("typedRole");

function type() {
  let word = roles[i];

  if (!deleting) {
    el.textContent = word.slice(0, j++);
    if (j > word.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    el.textContent = word.slice(0, j--);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % roles.length;
    }
  }

  setTimeout(type, deleting ? 60 : 120);
}

type();
