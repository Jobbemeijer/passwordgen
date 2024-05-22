function generatePassword() {
    const animals = ["mier", "eend", "kip", "hond", "paard", "kat", "vogel", "vis", "leeuw", "beer", "konijn", "kikker", "slang", "haai", "schaap", "vos", "varken"];
    let randomAnimal1, randomAnimal2;
    
    do {
        randomAnimal1 = animals[Math.floor(Math.random() * animals.length)];
        randomAnimal2 = animals[Math.floor(Math.random() * animals.length)];
    } while (randomAnimal1 === randomAnimal2);

    const randomNumber = Math.floor(Math.random() * 100);
    let password = randomAnimal1 + randomAnimal2 + randomNumber + "!";
    
    // Convert first character to uppercase
    password = password.charAt(0).toUpperCase() + password.slice(1);
    
    return password;
}

document.getElementById("generateBtn").addEventListener("click", function() {
    const password = generatePassword();
    document.getElementById("password").innerText = password;
});
