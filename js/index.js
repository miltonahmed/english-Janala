// 1. Load all lessons from API
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all') // API call for all lessons
    .then(res => res.json()) // Convert response into JSON
    .then(json => {
      // Pass lesson data to display function
      displayLessons(json.data);
    });
};

// 2. Load all words for a specific lesson
const lessonLoadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url) // API call for a specific lesson (by id/level_no)
    .then(res => res.json())
    .then(data => displayWord(data.data)); // Pass word list to display
};



// 3. Display all words of a lesson
const displayWord = (words) => {
  const wordContainer = document.getElementById('word_container');
  console.log('Before clear:', wordContainer.innerHTML.length);
  wordContainer.innerHTML = "";
  if(words.length === 0){
    alert('No word detected')
    return;
  } // Clear old content before showing new one

  // Loop through each word from API
  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="bg-white text-center space-y-3 rounded-xl shadow-sm py-10 px-5">
        <!-- Word Title -->
        <h2 class="font-poppins text-2xl md:text-3xl font-bold text-primary">${word.word}</h2>
        
        <!-- Subtitle -->
        <p class="font-poppins font-medium text-lg md:text-xl text-black">Meaning / Pronunciation</p>
        
        <!-- Meaning & Pronunciation -->
        <div class="font-poppins font-semibold text-lg md:text-3xl text-primary">
          ${word.meaning} / ${word.pronunciation}
        </div>
        
        <!-- Action Buttons -->
        <div class="flex justify-between items-start">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card); // Add each word card to container
  });
};

// 4. Display all lesson buttons
const displayLessons = lessons => {
  const levelContainer = document.getElementById('level_container');
  levelContainer.innerHTML = ''; // Clear old buttons

  // Loop through lesson list
  for (const lesson of lessons) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button
        onclick="lessonLoadWord(${lesson.level_no})" // When clicked, load that lesson's words
        class="btn btn-outline btn-primary font-poppins font-semibold text-sm text-[#422AD5] hover:text-white">
        <i class="fa-solid fa-book-open"></i>
        Lesson-${lesson.level_no}
      </button>
    `;
    levelContainer.append(btnDiv); // Add button to container
  }
};

// 5. Run function on page load
loadLessons();
