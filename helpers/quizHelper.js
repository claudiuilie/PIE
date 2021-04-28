
let ca = [];
const qPoint = 10;

function quizDbConverter(quizDb){
    let q = [];
    for(let k in quizDb){
        let o = {};
        o[`${quizDb[k].id}`] = JSON.parse(quizDb[k].correct_choice);
        q.push(o);
    }
    return q;
}

function quizUserConverter(quizUser) {
    let q = [];
    for(let k in quizUser){
        let o = {};
        if(k !== "quiz_id"){
            o[`${k}`] = typeof quizUser[k] === "object" ? quizUser[k] : [quizUser[k]] ;
            q.push(o);
        }
    }
    return q;
}

function quizCompare(x,y){
    return JSON.stringify(x) === JSON.stringify(y);
}

function quizPoints(eq) {
    if(eq)
        return qPoint;
    else
        return 0;
}

function quizScore(quizDb, quizUser){
    ca = [];
    let s = 0;
    for(let k in quizDb){
        let z = quizCompare(quizDb[k],quizUser[k])
        if(z){
            s += quizPoints(z);
            ca.push(parseInt(Object.keys(quizUser[k])[0]));
        }
    }
    return s;
}

function correctAnswers() {
    return ca;
}

module.exports = {
    quizScore,
    quizPoints,
    quizCompare,
    quizDbConverter,
    quizUserConverter,
    correctAnswers
}

