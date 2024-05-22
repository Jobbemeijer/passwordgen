let generatedPassword;
function generatePassword() {
    var wordType = document.getElementById("wordType").value; // Get selected word type
    var count = document.getElementById("count").value; // Get selected word count

    // Define arrays for different word types
    var animalsArray = ["muis", "kip", "paard", "leeuw", "tijger", "hond", "kat", "uil", "haai", "vis"];
    var sportsArray = ["football", "basketball", "tennis", "golf", "soccer", "baseball", "volleyball", "hockey", "cricket", "rugby"];
    var colorsArray = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "brown"];
    var shapesArray = ["circle", "square", "triangle", "rectangle", "pentagon", "hexagon", "octagon", "oval", "star", "heart"];

    // Define the selected array based on the selected word type
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
            selectedArray = animalsArray; // Default to animals if no valid option is selected
            break;
    }

    var passwordArray = [];

    // Choose random words from the selected word type array
    for (let i = 0; i < count; i++) {
        var word = selectedArray[Math.floor(Math.random() * selectedArray.length)];
        passwordArray.push(word);
    }

    // Add numbers
    var numberCount = document.getElementById("numberCount").value;
    for (let i = 0; i < numberCount; i++) {
        var number = Math.floor(Math.random() * 10);
        passwordArray.push(number);
    }

    // Add an exclamation mark
    passwordArray.push('!');

    // Convert the password array to a string
    var generatedPassword = passwordArray.join("");

    // Capitalize the first letter
    generatedPassword = generatedPassword.charAt(0).toUpperCase() + generatedPassword.slice(1);

    // Retrieve the value of the complexity level
var changeCount = document.getElementById("changeCount").value;

    // Change selected lowercase letters
    for (let i = 0; i < generatedPassword.length && i < changeCount; i++) {
        var letter = generatedPassword.charAt(i);
        switch (letter) {
            case 'a':
                generatedPassword = generatedPassword.slice(0, i) + '@' + generatedPassword.slice(i + 1);
                break;
            case 'e':
                generatedPassword = generatedPassword.slice(0, i) + '3' + generatedPassword.slice(i + 1);
                break;
            case 'o':
                generatedPassword = generatedPassword.slice(0, i) + '0' + generatedPassword.slice(i + 1);
                break;
            case 'i':
                generatedPassword = generatedPassword.slice(0, i) + '!' + generatedPassword.slice(i + 1);
                break;
            case 's':
                generatedPassword = generatedPassword.slice(0, i) + '$' + generatedPassword.slice(i + 1);
                break;
            default:
                // Do nothing if the letter is not one of a, e, o, i, s
                break;
                return generatedPassword; 
                console.log(generatedPassword); 
        }
    }
} 
        // Show the password in the text field
        document.getElementById("passwordDisplay").value = generatedPassword;
    
        console.log(generatedPassword);

    // Function to check the strength of a password
    function checkStrength(password) {
        var strength = 0;
    
        if (!password) {
            return; 
        }

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
        
        console.log(password);

        return strength;
    }
    
            // Check the strength of the password and display it
            var strength = checkStrength(generatedPassword);
            displayStrength(passwordStrength);
    




