const isSurvey = document.querySelector('input[name="isSurvey"]')?.value;
const parentEvaluation = document.querySelector('input[name="parent-evaluation"]')?.value;
const sessionInput = document.querySelector('input[name="session-input"]')?.value;

const descEl = document.querySelector('textarea[name="description"]');
const formEl = document.querySelector('.form-survey');
const ratingFaceEl = document.querySelectorAll('.e-rating__face');
const contentNoteEl = document.getElementById('content-noted');
const errorMessageEl = document.querySelector('.error-message');
let rating = '';
let ratingEl = null;

function handleIsSurvey () {
    ratingFaceEl.forEach(i => {
        if(i.getAttribute('data') === parentEvaluation) {
            i.style.transform = 'translateY(-1em)';
        } else {
            i.style.transform  = "";
            i.style.backgroundColor = '#cac9c3';
            i.style.pointerEvents = 'none';
            i.style.cursor = 'none';
        }
    })
}

if(isSurvey) {
    handleIsSurvey();
}

function handleChose (e,value) {
    errorMessageEl.innerText = '';
    let parentsEl = e.target.closest('.e-rating__face');
    ratingFaceEl.forEach(i => {
        i.style.transform  = ""
    })
    // parentsEl.addEventListener('mouseenter', handleParentHover);
    // parentsEl.addEventListener('mouseleave', handleParentHover);
    ratingEl = parentsEl;
    parentsEl.style.transform = "translateY(-1em)"
    rating = value;
}

function handleParentHover(event) {
    const parentsEl = event.currentTarget;
    if (event.type === 'mouseenter') {
        parentsEl.style.transform = 'translateY(2em) scale(1)';
    } else {
        parentsEl.style.transform = '';
    }
}

async function handleSubmit () {
    if(!rating) {
        errorMessageEl.innerText = 'Vui lòng đánh giá mức độ hài lòng!';
        return;
    }
  
    let data = {
        "parent_evaluation": rating,
        "parent_explanation": descEl.value,
        "session_input": +sessionInput
    };

    try {
        console.log({data});
        fetch('/send-survey', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            }
        )
        .then(response => response.json())
        .then((data) => {
            console.log('data client', data);
            if(data.code !== 201) {
                errorMessageEl.innerText = data.message
                return;
            }
            if(descEl.value.trim().length > 0) {
                contentNoteEl.innerHTML = descEl.value;
                contentNoteEl.parentElement.classList.remove('display-none');
            }
            if(ratingEl) {
                handleIsSurvey()
            }
            formEl.classList.add('display-none');
            clearForm();
        }).catch((err) => {
            errorMessageEl.innerText = err.message;
        })
    }catch(err) {
        console.log(err);
    }

}

window.document.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        handleSubmit()
    }
})

function clearForm () {
    rating = '';
    descEl.value = '';
    errorMessageEl.innerText = '';
}