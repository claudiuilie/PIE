let submitContainer = document.getElementById("quiz_submit_container");
let radioInputs = document.getElementsByTagName("input");
for (let x = 0; x < radioInputs.length; x++) {
    radioInputs[x].addEventListener('change', () => {
        if (submit()) {
            submitContainer.removeAttribute('hidden');
        }
    });
}

function submit() {
    let quizForm = document.getElementById("quiz_form");
    let questions = quizForm.getElementsByClassName("question");
    let count = 0;
    for (let k = 0; k < questions.length; k++) {
        let checked = false;
        let inputs = questions[k].getElementsByTagName("input")
        for (let z = 0; z < inputs.length; z++) {
            if (inputs[z].checked) {
                checked = true;
            }
        }
        if (checked) {
            count++;
        }

    }

    if (count === questions.length) {
        return true;
    } else {
        return false;
    }

}