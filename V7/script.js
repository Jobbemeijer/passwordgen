// Voeg event listeners toe aan sliders om hun bijbehorende spans bij te werken
document.getElementById("count").addEventListener("input", function() {
  document.getElementById("countValue").textContent = this.value;
});

document.getElementById("numberCount").addEventListener("input", function() {
  document.getElementById("numberCountValue").textContent = this.value;
});

document.getElementById("changeCount").addEventListener("input", function() {
  document.getElementById("changeCountValue").textContent = this.value;
});

// Functie om geselecteerde woordtypes op te halen
function getSelectedWordTypes() {
  const selectedWordTypes = [];
  if (document.getElementById("animalsCheckbox").checked) selectedWordTypes.push("animals");
  if (document.getElementById("sportsCheckbox").checked) selectedWordTypes.push("sports");
  if (document.getElementById("colorsCheckbox").checked) selectedWordTypes.push("colors");
  if (document.getElementById("shapesCheckbox").checked) selectedWordTypes.push("shapes");
  return selectedWordTypes;
}

// Functie om willekeurige letters te vervangen door speciale tekens op basis van complexiteitsniveau
function addComplexity(generatedPassword, changeCount) {
  const replacements = { 'a': '@', 'e': '3', 'o': '0', 'i': '!', 's': '$' };
  let indicesToReplace = [];
  for (let i = 0; i < generatedPassword.length; i++) {
    let letter = generatedPassword.charAt(i);
    if (replacements.hasOwnProperty(letter)) indicesToReplace.push(i);
  }
  indicesToReplace = shuffle(indicesToReplace);
  let replacedCount = 0;
  for (let i = 0; i < indicesToReplace.length && replacedCount < changeCount; i++) {
    let index = indicesToReplace[i];
    let letterToReplace = generatedPassword.charAt(index);
    let replacement = replacements[letterToReplace];
    generatedPassword = generatedPassword.slice(0, index) + replacement + generatedPassword.slice(index + 1);
    replacedCount++;
  }
  return generatedPassword;
}

// Functie om een array te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Functie om wachtwoord letter voor letter weer te geven
function displayPasswordLetterByLetter(password) {
  const passwordDisplay = document.getElementById("passwordDisplay");
  passwordDisplay.value = '';
  let i = 0;
  function addNextLetter() {
    if (i < password.length) {
      passwordDisplay.value += password[i];
      i++;
      setTimeout(addNextLetter, 100); // Tijdinterval van 100ms tussen elke letter
    }
  }
  addNextLetter();
}

// Bijgewerkte functie om een wachtwoord te genereren, inclusief de complexiteitsfunctie
function generatePassword() {
  let passwordArray = [];
  // Haal de geselecteerde woordtypes en aantallen op
  const selectedWordTypes = getSelectedWordTypes();
  const count = document.getElementById("count").value;
  const wordsPerType = Math.floor(count / selectedWordTypes.length);
  const remainingWords = count % selectedWordTypes.length;

  const animalsArray = ["muis", "kip", "paard", "leeuw", "tijger", "hond", "kat", "uil", "haai", "vis"];
  const sportsArray = ["voetbal", "basketbal", "tennis", "golf", "voetbal", "honkbal", "volleybal", "hockey", "cricket", "rugby"];
  const colorsArray = ["rood", "blauw", "groen", "geel", "oranje", "paars", "roze", "zwart", "wit", "bruin"];
  const shapesArray = ["cirkel", "vierkant", "driehoek", "rechthoek", "pentagon", "hexagoon", "octagoon", "ovaal", "ster", "hart"];
  const specialCharactersArray = ["!", "?", "$", "#", "@"];

  // Itereer over geselecteerde woordtypes en kies willekeurige woorden
  selectedWordTypes.forEach(wordType => {
    let selectedArray;
    switch (wordType) {
      case "animals": selectedArray = animalsArray; break;
      case "sports": selectedArray = sportsArray; break;
      case "colors": selectedArray = colorsArray; break;
      case "shapes": selectedArray = shapesArray; break;
      default: selectedArray = animalsArray; break;
    }
    for (let i = 0; i < wordsPerType; i++) {
      const word = selectedArray[Math.floor(Math.random() * selectedArray.length)];
      passwordArray.push(word);
    }
  });

  // Voeg resterende woorden toe indien nodig
  if (remainingWords > 0) {
    const selectedArray = selectedWordTypes[0] === "animals" ? animalsArray : sportsArray;
    for (let i = 0; i < remainingWords; i++) {
      const word = selectedArray[Math.floor(Math.random() * selectedArray.length)];
      passwordArray.push(word);
    }
  }

  // Voeg nummers toe aan het wachtwoord
  const numberCount = document.getElementById("numberCount").value;
  for (let i = 0; i < numberCount; i++) {
    const number = Math.floor(Math.random() * 10);
    passwordArray.push(number);
  }

  // Voeg een speciaal teken toe aan het wachtwoord
  const specialCharacter = specialCharactersArray[Math.floor(Math.random() * specialCharactersArray.length)];
  passwordArray.push(specialCharacter);

  // Voeg de array samen tot een enkele string en maak de eerste letter hoofdletter
  let generatedPassword = passwordArray.join("");
  generatedPassword = generatedPassword.charAt(0).toUpperCase() + generatedPassword.slice(1);

  // Voeg complexiteitsfunctie toe
  const changeCount = document.getElementById("changeCount").value;
  generatedPassword = addComplexity(generatedPassword, changeCount);

  // Geef het gegenereerde wachtwoord letter voor letter weer
  displayPasswordLetterByLetter(generatedPassword);

  // Controleer sterkte en geef weer
  const strength = checkStrength(generatedPassword);
  displayStrength(strength);
}

// Placeholder functies om wachtwoordsterkte te controleren en weer te geven
function checkStrength(password) {
  // Voeg hier je eigen logica toe om de wachtwoordsterkte te controleren
  return 'Sterk';
}

function displayStrength(strength) {
  // Voeg hier je eigen logica toe om de wachtwoordsterkte weer te geven
  document.getElementById("passwordStrength").textContent = strength;
}

// Event listener voor de generate button
document.getElementById("generateBtn").addEventListener("click", generatePassword);

// Functie om het gegenereerde wachtwoord naar het klembord te kopiëren
document.getElementById("copyBtn").addEventListener("click", function() {
  const passwordDisplay = document.getElementById("passwordDisplay");
  passwordDisplay.select();
  document.execCommand("copy");

  // Toon de melding en laat deze vervagen
  const copyMessage = document.getElementById("copyMessage");
  copyMessage.style.display = "block";
  copyMessage.style.opacity = 1;

  setTimeout(function() {
    let fadeEffect = setInterval(function() {
      if (!copyMessage.style.opacity) {
        copyMessage.style.opacity = 1;
      }
      if (copyMessage.style.opacity > 0) {
        copyMessage.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
        copyMessage.style.display = "none";
      }
    }, 50);
  }, 1000);
});
