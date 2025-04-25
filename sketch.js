let currentQuestion = 0;
let questions = [
  {
    question: "1 + 1 = ?",
    options: [1, 2, 3],
    correct: 2
  },
  {
    question: "2 + 2 = ?",
    options: [2, 4, 6],
    correct: 4
  },
  {
    question: "5 + 5 = ?",
    input: true,
    correct: 10
  }
];
let userInput = "";

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕
}

function draw() {
  background(220);
  textSize(20);
  textAlign(CENTER, CENTER);

  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    text(q.question, width / 2, 50);

    if (q.input) {
      // Input-based question
      text("Your Answer: " + userInput, width / 2, height / 2 - 50);
      text("Press ENTER to submit", width / 2, height / 2);
    } else {
      // Multiple-choice question
      for (let i = 0; i < q.options.length; i++) {
        let x = width / 2 - 100; // 框框的 X 座標
        let y = height / 2 - 50 + i * 60; // 框框的 Y 座標
        let w = 200; // 框框的寬度
        let h = 40; // 框框的高度

        // 繪製框框
        fill(255);
        stroke(0);
        rect(x, y, w, h, 10); // 矩形框，帶圓角

        // 繪製選項文字
        fill(0);
        noStroke();
        text(q.options[i], x + w / 2, y + h / 2);
      }
    }
  } else {
    text("Quiz Complete!", width / 2, height / 2);
  }
}

function mousePressed() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    if (!q.input) {
      for (let i = 0; i < q.options.length; i++) {
        let x = width / 2 - 100; // 框框的 X 座標
        let y = height / 2 - 50 + i * 60; // 框框的 Y 座標
        let w = 200; // 框框的寬度
        let h = 40; // 框框的高度

        // 檢查滑鼠是否點擊在框框內
        if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
          if (q.options[i] === q.correct) {
            currentQuestion++;
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    if (q.input) {
      if (keyCode === BACKSPACE) {
        userInput = userInput.slice(0, -1);
      } else if (keyCode === ENTER) {
        if (parseInt(userInput) === q.correct) {
          currentQuestion++;
          userInput = "";
        }
      } else if (key >= '0' && key <= '9') {
        userInput += key;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}
