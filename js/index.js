const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => {
      // Pass data to display
      displayLessons(json.data);
    });
};

const lessonLoadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayWord(data.data));
};

const displayWord = words => {
  const wordContainer = document.getElementById('word_container');
  lessonLoadWord.innerHTML = '';

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
                    <div class="bg-white text-center space-y-3 rounded-xl shadow-sm py-10 px-5">
                    <h2 class="font-poppins text-2xl md:text-3xl font-bold text-primary">${word.word}</h2>
                    <p class="font-poppins font-medium text-lg md:text-xl text-black">Meaning /Pronunciation</p>
                    <div class="font-poppins font-semibold text-lg md:text-3xl text-primary">${word.meaning}/ ${word.pronunciation}</div>
                    <div class="flex justify-between items-start">
                    <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                    </div>
    `;
    wordContainer.append(card);
  });
};
const displayLessons = lessons => {
  // 1. get the container & empty
  const levelContainer = document.getElementById('level_container');
  levelContainer.innerHTML = '';

  // 2. loop through lessons
  for (const lesson of lessons) {
    // 3. create a Element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button
       onclick="lessonLoadWord(${lesson.level_no})"
        class="btn btn-outline btn-primary font-poppins font-semibold text-sm text-[#422AD5] hover:text-white">
        <i class="fa-solid fa-book-open"></i>
        Lesson-${lesson.level_no}
      </button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
