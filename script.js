const bpForm = document.getElementById('bpForm');  
const resultDiv = document.getElementById('result');  
const historyDiv = document.getElementById('history');  

// Initialize history  
let history = JSON.parse(localStorage.getItem('bpHistory')) || [];  

function checkBloodPressure(systolic, diastolic) {  
    if (systolic < 120 && diastolic < 80) {  
        return "😊 Your blood pressure is normal! Keep maintaining a healthy lifestyle!";  
    } else if (120 <= systolic < 130 && diastolic < 80) {  
        return "🟡 Your blood pressure is elevated. Consider making some lifestyle changes.";  
    } else if (130 <= systolic < 140 || 80 <= diastolic < 90) {  
        return "🟠 This is Hypertension Stage 1. It's a good idea to consult a healthcare provider for advice.";  
    } else if (140 <= systolic < 180 || 90 <= diastolic < 120) {  
        return "🔴 This is Hypertension Stage 2. Please seek medical attention as soon as possible.";  
    } else if (systolic >= 180 && diastolic >= 120) {  
        return "🚨 Hypertensive Crisis! This is serious; please seek emergency medical help immediately.";  
    } else {  
        return "⚠️ It seems the readings are invalid.";  
    }  
}  

function displayHistory() {  
    historyDiv.innerHTML = "<h2>Blood Pressure History:</h2>";  
    history.forEach(entry => {  
        const div = document.createElement('div');  
        div.className = 'history-item';  
        div.textContent = `Systolic: ${entry.systolic}, Diastolic: ${entry.diastolic} - ${entry.result}`;  
        historyDiv.appendChild(div);  
    });  
}  

bpForm.addEventListener('submit', function (event) {  
    event.preventDefault(); // Prevent form submission  

    const systolic = parseInt(document.getElementById('systolic').value);  
    const diastolic = parseInt(document.getElementById('diastolic').value);  
    const result = checkBloodPressure(systolic, diastolic);  

    // Display result  
    resultDiv.textContent = result;  

    // Store in history  
    const entry = { systolic, diastolic, result };  
    history.push(entry);  
    localStorage.setItem('bpHistory', JSON.stringify(history));  

    // Update history display  
    displayHistory();  
});  

// Display history on page load  
displayHistory();