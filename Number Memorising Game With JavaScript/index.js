const numberField = document.querySelector("#numbers");
const inputField = document.querySelector("input");
const submitBtn = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const level = document.getElementById("level");
const game = document.getElementById("game");
const form = document.querySelector("form");
const end = document.getElementById("end");
const total = document.getElementById("total");

let testNumber;
let minMax;
let numOfAnswered = 0;
let numOfCorrect = 0;

function generateGame(minMax){
    toggleVisibility([level,game]);
    assignNumber(minMax);
}
const difficulty={
    easy:[1000,9999],
    medium:[100000,999999],
    hard:[10000000,99999999]
}
const difficultyBtns= document.querySelectorAll('.difficulty');
difficultyBtns.forEach((btn)=>{
    btn.addEventListener('click',function(e){
        const value=e.target.innerText.toLowerCase();
        minMax=difficulty[value];
        generateGame(minMax);
        end.classList.remove('hide');
        total.innerText = `Total: ${numOfCorrect} / ${numOfAnswered}`
        inputField.focus();
    })
})

function generateNumber(minMax){
    const min=minMax[0];
    const max=minMax[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function assignNumber(minMax){
    testNumber = generateNumber(minMax);
    console.log("testNumber",testNumber);
    numberField.innerText= testNumber;
    numberField.classList.remove('hide');
    setTimeout(function(){
        numberField.classList.add('hide');
    },2000);
}
function checkResult(){
    numOfAnswered +=1;
    const inputValue = inputField.value;
    console.log("inputValue",inputValue)
    if(parseInt(inputValue) === testNumber){
        numOfCorrect +=1;
        feedback.innerText ="Correct";
        feedback.classList.add('correct');
        feedback.classList.remove('wrong');
    }else if(isNaN(inputValue)){
        feedback.innerText =`Only Numbers Allowed!`;
        feedback.classList.remove('correct');
        feedback.classList.add('wrong');
    }else{
        feedback.innerText =`Incorrect The Answer Is ${testNumber}`;
        feedback.classList.remove('correct');
        feedback.classList.add('wrong');
    }
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkResult();
    total.innerText = `Total: ${numOfCorrect} / ${numOfAnswered}`
    toggleVisibility([submitBtn,nextBtn]);
    nextBtn.focus();

})
nextBtn.addEventListener('click',function(e){
    feedback.innerText='';
    inputField.value = '';
    assignNumber(minMax);
    inputField.focus();
    toggleVisibility([submitBtn,nextBtn]);

})
end.addEventListener('click',function(e){
        minMax = undefined; 
        testNumber = undefined; 
        numOfAnswered = 0; 
        numOfCorrect = 0; 
        total.innerText = '';
        feedback.innerText = ''; 
        inputField.value = '';
        end.classList.add('hide'); 
        nextBtn.classList.add('hide'); 
        submitBtn.classList.remove('hide');
        toggleVisibility([level, game]); 
})
function toggleVisibility(elements){
    console.log("elements",elements);
    elements.forEach(element => {
        console.log("element",element);
        element.classList.toggle('hide');
    });
}

// const r=generateNumber();