function generatePassword() {

var animalCount = document.getElementById("animalCount").value;
var numberCount = document.getElementById("numberCount").value;

var animalsArray = [
"muis", "kip", "paard", "leeuw", "tijger", "hond", "kat", "uil", "kikker"
// Voeg meer dierennamen toe zoals gewenst 
];

var passwordArray = [];

// Kies willekeurige dieren
for (let i = 0; i < animalCount; i++) {
var animal = animalsArray[Math.floor(Math.random() * animalsArray.length)];
passwordArray.push(animal);
}


// Voeg een cijfer toe
for (let i = 0; i < numberCount; i++) {
var number = Math.floor(Math.random() * 10);
passwordArray.push(number);
}

// Voeg een uitroepteken toe
passwordArray.push('!');

// Zet het wachtwoord om naar een string
var generatedPassword = passwordArray.join("");

// Toon het wachtwoord in het tekstveld
document.getElementById("passwordDisplay").value = generatedPassword;

// Check de sterkte van het wachtwoord en toon het
var strength = checkStrength(generatedPassword);
displayStrength(strength);
}

// New strength check function
function checkStrength(password) {
  var strength = 0;

  // Check for minimum length
  if (password.length >= 8) {
      strength++;
  }

  // Check for uppercase letters
  if (password.match(/[A-Z]/)) {
      strength++;
  }

  // Check for lowercase letters
  if (password.match(/[a-z]/)) {
      strength++;
  }

  // Check for numbers
  if (password.match(/[0-9]/)) {
      strength++;
  }

  // Check for special characters
  if (password.match(/[\W_]/)) {
      strength++;
  }

  return strength;
}

function displayStrength(strength) {
  var strengthDisplay = document.getElementById('strength');
  if (strengthDisplay) {
      if (strength < 3) {
          strengthDisplay.innerText = "Weak";
      } else if (strength < 6) {
          strengthDisplay.innerText = "Medium";
      } else {
          strengthDisplay.innerText = "Strong";
      }
  }
}

// Call displayStrength after generating the password
displayStrength(strength);{}

