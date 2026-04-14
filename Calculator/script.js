let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

/* Append */
function append(value) {
  display.value += value;
}

/* Clear */
function clearDisplay() {
  display.value = "";
}

/* Delete */
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/* Calculate */
function calculate() {
  try {
    let expression = display.value;
    let result = eval(expression);

    // Add to history
    let li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);

    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* Theme Toggle */
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* Default Theme */
document.body.classList.add("light");

/* Keyboard Support */
document.addEventListener("keydown", function(e) {
  let key = e.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    append(key);
  }
  else if (key === "Enter") {
    calculate();
  }
  else if (key === "Backspace") {
    deleteLast();
  }
  else if (key === "Escape") {
    clearDisplay();
  }
});
const button = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", function(e) {

    // Glow effect
    button.classList.add("glow");

    setTimeout(() => {
      button.classList.remove("glow");
    }, 200);

    // Ripple effect
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");

    let rect = button.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", (e) => {

    let rect = button.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // create multiple drops
    for (let i = 0; i < 8; i++) {
      let drop = document.createElement("span");
      drop.classList.add("drop");

      // random direction
      let angle = Math.random() * 2 * Math.PI;
      let distance = Math.random() * 60;

      let xMove = Math.cos(angle) * distance + "px";
      let yMove = Math.sin(angle) * distance + "px";

      drop.style.left = x + "px";
      drop.style.top = y + "px";
      drop.style.setProperty("--x", xMove);
      drop.style.setProperty("--y", yMove);

      button.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 600);
    }

  });
});