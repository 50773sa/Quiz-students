/*
Godkänt

- Följer strukturen och upplägget ovan
- Den ursprungliga array:en förblir oförändrad
- Visar resultat med antal rätt samt totalt antal frågor (t.ex. 16/20 rätt om man fick 16 rätt på 20 frågor)

Väl Godkänt

- Använda Array Filter & Array Map
- Slumpa ordningen som bilderna kommer i
- Visa vilka man gissade fel på och vilket som var rätt svar. Antingen genom att i listan visa vad man gissade på 
    och vad som var rätt svar, eller i en ny lista under resultatet visa foto + namn på de man gissade fel på
- Håll reda på senaste resultat och vid varje ny gissning visa om man förbättrade eller försämrade sig denna gången
*/

const photoEl = document.querySelector('.photo');
const guessBtnWrap = document.querySelector('.guessBtnWrap');
const lightboxEl = document.querySelector('#lightboxWrapper')
const playAgainButtonEl = document.querySelector('#playAgainButton')
const resultEl = document.querySelector('#result');
const resultButtonEl = document.querySelector('.resultButton');

//-------------ARRAYS-----------------------------------------------------------------------------

const students = [
	{
		"name" : "Adi Dzocaj",
		"image": "img/adi-dzocaj.jpg",
	},
	{
		"name" : "Alexander Bergquist",
		"image": "img/alexander-bergquist.jpg",
	},
	{
		"name" : "Alexander Kocman",
		"image": "img/alexander-kocman.jpg",
	},
	{
		"name" : "Benjamin Benson",
		"image": "img/benjamin-benson.jpg",
	},
	{
		"name" : "Benjamin Tsubarah",
		"image": "img/benjamin-tsubarah.jpg",
	},
	{
		"name" : "Calle Nilsson",
		"image": "img/calle-nilsson.jpg",
	},
	{
		"name" : "Chikage Takahashi Molander",
		"image": "img/chikage-takahashi-molander.jpg",
	},
	{
		"name" : "Daniel Be",
		"image": "img/daniel-be.jpg",
	},
	{
		"name" : "Daniel Carlsson",
		"image": "img/daniel-carlsson.jpg",
	},
	{
		"name" : "Elin Ahlgren",
		"image": "img/elin-ahlgren.jpg",
	},
	{
		"name" : "Emma Käck",
		"image": "img/emma-kack.jpg",
	},
	{
		"name" : "Eric Ståhl",
		"image": "img/eric-stahl.jpg",
	},
	{
		"name" : "Frans Gustavson Påsse",
		"image": "img/frans-gustavson-passe.jpg",
	},
	{
		"name" : "Glafira Veretennikova",
		"image": "img/glafira-veretennikova.jpg",
	},
	{
		"name" : "Gustaf Grönlund",
		"image": "img/gustaf-gronlund.jpg",
	},
	{
		"name" : "Hanna Håkanson",
		"image": "img/hanna-hakanson.jpg",
	},
	{
		"name" : "Heidi Sjöberg",
		"image": "img/heidi-sjoberg.jpg",
	},
	{
		"name" : "Hugo Carzborn",
		"image": "img/hugo-carzborn.jpg",
	},
	{
		"name" : "Jesper Kling",
		"image": "img/jesper-kling.jpg",
	},
	{
		"name" : "Johan Ranestam",
		"image": "img/johan-ranestam.jpg",
	},
	{
		"name" : "Johanna Bäckström",
		"image": "img/johanna-backstrom.jpg",
	},
	{
		"name" : "Johanna Jönsson",
		"image": "img/johanna-jonsson.jpg",
	},
	{
		"name" : "Jona Torsson",
		"image": "img/jona-torsson.jpg",
	},
	{
		"name" : "Josefine Ahlstedt",
		"image": "img/josefine-ahlstedt.jpg",
	},
	{
		"name" : "Julia Jespersdotter Högman",
		"image": "img/julia-jespersdotter-hogman.jpg",
	},
	{
		"name" : "Julia Nemell",
		"image": "img/julia-nemell.jpg",
	},
	{
		"name" : "Linus Lindberg",
		"image": "img/linus-lindberg.jpg",
	},
	{
		"name" : "Malin Olsson",
		"image": "img/malin-olsson.jpg",
	},
	{
		"name" : "Maria Haara-Lundhammar",
		"image": "img/maria-haara-lundhammar.jpg",
	},
	{
		"name" : "Maria Lövgren",
		"image": "img/maria-lovgren.jpg",
	},
	{
		"name" : "Nikola Dimitrijoski",
		"image": "img/nikola-dimitrijoski.jpg",
	},
	{
		"name" : "Paulina Kiendys",
		"image": "img/paulina-kiendys.jpg",
	},
	{
		"name" : "Raymond Lam",
		"image": "img/raymond-lam.jpg",
	},
	{
		"name" : "Robin Karlsson",
		"image": "img/robin-karlsson.jpg",
	},
	{
		"name" : "Sara Almqvist",
		"image": "img/sara-almqvist.jpg",
	},
	{
		"name" : "Tim Nilsson",
		"image": "img/tim-nilsson.jpg",
	},
	{
		"name" : "Tirapat Sukjit",
		"image": "img/tirapat-sukjit.jpg",
	},
	{
		"name" : "Tobias Silfverberg",
		"image": "img/tobias-silfverberg.jpg",
	},
	{
		"name" : "Wiktoria Dobrzewinska",
		"image": "img/wiktoria-dobrzewinska.jpg",
	},
];
//console.log(students);

let correctGuessIndex = ""; // Måste ligga utanför. getStudents kan inte komma åt den inne i scopet
let names;

let guesses = 0; 
let correctPoints = 0;

//----------SHUFFLE STUDENTS-------------------------------------------------

//Fisher-Yates algorithm
const shuffleArray = (array) => { //shuffle names in copied array
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  //shuffles new array
        const  temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

//-----------SHOW  ONE IMAGE AND 4 BUTTON WITH NAMES-------------------------------------------

const showStudent = () => { // skapar en funktion för att kunna kalla på den igen
	guessBtnWrap.innerHTML = ""; //Gör att fler knappar ej skapas.
	shuffleArray(students); //shufflar studenterna

	const studentSlice = students.slice(0,4); // Plockar ut fyra första studenterna
    correctGuessIndex = students[1];	//Rätt svar på index 1
	photoEl.src = correctGuessIndex.image; //Plockar fram bild

	shuffleArray(studentSlice); //shufflar slice-arna så rätt svar inte alltid är på samma plats
	//console.log(correctGuessIndex);

 	names = studentSlice.map(students => students.name); //Plockar ut de fyra namnen till en ny array.

	names.forEach(name => { //För varje namn skapas en knapp.
		guessBtnWrap.innerHTML += `<button class="guess">${name}</button>`;
	});

};

//-----------ADD CLICK EVENTS FOR EACH NAME-----------------------------------

showStudent();

guessBtnWrap.addEventListener('click', e  => {
	e.preventDefault();

	if ('BUTTON' === e.target.tagName && guesses < 10){ //Om target är en button... Här ska 10 foton visas
		guesses ++; //Antal gissade ggr
		console.log(e.target);
	

	if (e.target.innerText === correctGuessIndex.name) {	 //...om namnet på knappen hör ihop med bilden.
		correctPoints++ //  Om det är rätt, 1 poäng
		e.target.classList.add('correct')
		
	}	else if (guesses === 10) { //När spelet har visat 10 bilder visas lightboxen...
			lightboxEl.classList.add('show');
			resultButtonEl.classList.add('show');//...och resultatknappen

	}	else {
			e.target.classList.add('wrong')
	}
	
}
});

//----------- HIDE RESULT BUTTON WHEN CLICKED ON. THEN SHOW SCORE--------------

resultButtonEl.addEventListener('click', e => {
	e.preventDefault();
	console.log(e.target)

	/*
	//Filter student
	userGuesses.filter(student => student.userGuess === false) //filtrera ut fel svar
	userGuesses.forEach(guess  => { // för varje fel svar, visa bild och
		wrongStudentsEl.innerHTML += `
		<figure>
			<img src="students/${guess.image}" alt="wrongstudent">
			<figcaption>${guess.name}</figcaption>
		</figure>
		`	
	});
	*/
	
	if ('BUTTON' === e.target.tagName) {
			
		resultButtonEl.classList.remove('show'); // resultatknappen döljs
		resultEl.classList.add('show');
		resultEl.innerText =`Antal rätt: ${correctPoints}/${guesses}`; //poäng
		playAgainButtonEl.classList.add('show');
	}	
});

//------------------PLAY AGAIN BUTTON--------------------------------------

playAgainButtonEl.addEventListener('click', e => {

	if ('BUTTON' === e.target.tagName) {
		guesses = 0; 	//När spelet är slut nollställs räknaren
		correctPoints = 0;

		resultEl.classList.remove('show');	//Dölj resultat
		playAgainButtonEl.classList.remove('show'); //Dölj splela-igen-knappen
		lightboxEl.classList.remove('show'); // Dölj lightbox
	}				
	showStudent();
});

showStudent();

//-------------------------------------------------------------------------------

