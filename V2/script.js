generatePassword();
  {,
  var animalsArray = [
    "muis", "kikker", "olifant", "leeuw", "tijger", "pinguïn", "giraffe", "nijlpaard", "schildpad", "papegaai"
    // Voeg meer dierennamen toe zoals gewenst
  ];

  var passwordArray = [];
  var digitsArray = [];
  var digitsPositionArray = [];

  // Kies willekeurig twee dieren
  var animal1 = animalsArray[Math.floor(Math.random() * animalsArray.length)];
  var animal2 = animalsArray[Math.floor(Math.random() * animalsArray.length)];

  // Voeg dieren toe aan het wachtwoord met de gewenste opmaak
  passwordArray.push(animal1.charAt(0).toUpperCase() + animal1.slice(1));
  passwordArray.push(animal2.charAt(0).toUpperCase() + animal2.slice(1));

  // Voeg een cijfer toe
  var digit = Math.round(Math.random() * 9);
  passwordArray.push(digit);

  // Voeg een uitroepteken toe
  passwordArray.push('!');

  // Schud de volgorde van het wachtwoord om
  passwordArray = this.shuffle(passwordArray);

  // Zet het wachtwoord om naar een string
  this.password = passwordArray.join("");
}

// Methode om een array willekeurig te schudden
shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
