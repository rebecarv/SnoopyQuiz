//Carousel
document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
      return `<span class="carousel__button"></span>`;
    });
  
    carousel.insertAdjacentHTML(
      "beforeend",
      `
          <div class="carousel__nav">
              ${buttonsHtml.join("")}
          </div>
      `
    );
  
    const buttons = carousel.querySelectorAll(".carousel__button");
  
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        // un-select all the items
        items.forEach((item) =>
          item.classList.remove("carousel__item--selected")
        );
        buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected")
        );
  
        items[i].classList.add("carousel__item--selected");
        button.classList.add("carousel__button--selected");
      });
    });
  
    // Select the first item on page load
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");
  });
  

  // Variable to track selections for each option
let optionCounts = [0, 0, 0];

function nextQuestion(questionNumber, selectedOption) {
  // Increase the count for the selected option
  if (selectedOption !== undefined) {
    optionCounts[selectedOption - 1]++;
  }

  // Move to the next question
  const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
  const nextQuestion = document.getElementById(`question${questionNumber}`);
  if (currentQuestion) currentQuestion.style.display = 'none';
  if (nextQuestion) {
    nextQuestion.style.display = 'block';
  }

  // If we've reached the end, display the result
  if (questionNumber === 8) {
    displayResult();
  }
}

function displayResult() {
  const maxCount = Math.max(...optionCounts); // Get the highest count
  const resultIndex = optionCounts.indexOf(maxCount) + 1; // Determine which option was selected most

  // Redirect to the results page, passing the resultIndex as a query parameter
  window.location.href = `result.html?result=${resultIndex}`;
}

// Attach click events to each option in each question
document.querySelectorAll('.option').forEach((option, index) => {
  option.addEventListener('click', () => {
    const questionNumber = Math.ceil((index + 1) / 3); // Calculate question number
    const selectedOption = parseInt(option.getAttribute('data-option')); // Get the option from data attribute
    nextQuestion(questionNumber + 1, selectedOption);
  });
});
