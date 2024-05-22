    // Add event listeners to sliders to update their corresponding spans
    document.getElementById("count").addEventListener("input", function() {
        document.getElementById("countValue").textContent = this.value;
    });
    document.getElementById("numberCount").addEventListener("input", function() {
        document.getElementById("numberCountValue").textContent = this.value;
    });
    document.getElementById("changeCount").addEventListener("input", function() {
        document.getElementById("changeCountValue").textContent = this.value;
    });

// Function to get selected word types
function getSelectedWordTypes() {
    const selectedWordTypes = [];
    if (document.getElementById("animalsCheckbox").checked) {
        selectedWordTypes.push("animals");
    }
    if (document.getElementById("sportsCheckbox").checked) {
        selectedWordTypes.push("sports");
    }
    if (document.getElementById("colorsCheckbox").checked) {
        selectedWordTypes.push("colors");
    }
    if (document.getElementById("shapesCheckbox").checked) {
        selectedWordTypes.push("shapes");
    }
    return selectedWordTypes;
}

// Function to replace random letters with special characters based on complexity level
function addComplexity(generatedPassword, changeCount) {
    // Define an object of characters to be replaced and their corresponding replacements
    var replacements = {
        'a': '@',
        'e': '3',
        'o': '0',
        'i': '!',
        's': '$'
    };

    // Shuffle an array of indices of characters to be replaced
    var indicesToReplace = [];
    for (let i = 0; i < generatedPassword.length; i++) {
        var letter = generatedPassword.charAt(i);
        if (replacements.hasOwnProperty(letter)) {
            indicesToReplace.push(i);
        }
    }
    indicesToReplace = shuffle(indicesToReplace);

    // Replace the specified number of letters based on the complexity level
    var replacedCount = 0;
    for (let i = 0; i < indicesToReplace.length && replacedCount < changeCount; i++) {
        var index = indicesToReplace[i];
        var letterToReplace = generatedPassword.charAt(index);
        var replacement = replacements[letterToReplace];
        generatedPassword = generatedPassword.slice(0, index) + replacement + generatedPassword.slice(index + 1);
        replacedCount++;
    }

    return generatedPassword;
}

// Function to shuffle an array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// Updated generatePassword function including the complexity feature
function generatePassword() {
    var passwordArray = [];
    // Get the selected word types and count
    var selectedWordTypes = getSelectedWordTypes(); // Assuming you have the getSelectedWordTypes function implemented

    var count = document.getElementById("count").value;

    // Define arrays for different word types
    var animalsArray = ["muis", "kip", "paard", "leeuw", "tijger", "hond", "kat", "uil", "haai", "vis"];
    var sportsArray = ["voetbal", "basketbal", "tennis", "golf", "voetbal", "honkbal", "volleybal", "hockey", "cricket", "rugby"];
    var colorsArray = ["rood", "blauw", "groen", "geel", "oranje", "paars", "roze", "zwart", "wit", "bruin"];
    var shapesArray = ["cirkel", "vierkant", "driehoek", "rechthoek", "pentagon", "hexagoon", "octagoon", "ovaal", "ster", "hart"];
    var specialCharactersArray = ["!", "?", "$", "#", "@"];

    // Calculate the number of words to select from each word type
    var wordsPerType = Math.floor(count / selectedWordTypes.length);
    var remainingWords = count % selectedWordTypes.length;

    // Iterate over selected word types and choose random words
    selectedWordTypes.forEach(function(wordType) {
        var selectedArray;
        switch (wordType) {
            case "animals":
                selectedArray = animalsArray;
                break;
            case "sports":
                selectedArray = sportsArray;
                break;
            case "colors":
                selectedArray = colorsArray;
                break;
            case "shapes":
                selectedArray = shapesArray;
                break;
            default:
                selectedArray = animalsArray;
                break;
        }

        // Add words from the selected array
        for (let i = 0; i < wordsPerType; i++) {
            var word = selectedArray[Math.floor(Math.random() * selectedArray.length)];
            passwordArray.push(word);
        }
    });

    // Add remaining words if necessary
    if (remainingWords > 0) {
        var selectedArray = selectedWordTypes[0] === "animals" ? animalsArray : sportsArray; // Use the first selected word type
        for (let i = 0; i < remainingWords; i++) {
            var word = selectedArray[Math.floor(Math.random() * selectedArray.length)];
            passwordArray.push(word);
        }
    }

    var numberCount = document.getElementById("numberCount").value;
    for (let i = 0; i < numberCount; i++) {
        var number = Math.floor(Math.random() * 10);
        passwordArray.push(number);
    }

    // Kies een willekeurig speciaal teken uit de array
    var specialCharacter = specialCharactersArray[Math.floor(Math.random() * specialCharactersArray.length)];

    // Voeg het speciale teken toe aan het wachtwoord
    passwordArray.push(specialCharacter);

    var generatedPassword = passwordArray.join("");

    generatedPassword = generatedPassword.charAt(0).toUpperCase() + generatedPassword.slice(1);

    // Add complexity feature
    var changeCount = document.getElementById("changeCount").value;
    generatedPassword = addComplexity(generatedPassword, changeCount);

    // Update password display
    document.getElementById("passwordDisplay").value = generatedPassword;

    // Check strength and display
    var strength = checkStrength(generatedPassword);
    displayStrength(strength);
}
