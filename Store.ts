import { createStore } from "redux";

interface Subject {
    subject: string,
    homeworks: string[],
}

interface Homeworks {
    homeworksAndSubjects: Subject[]
}

const homework: Homeworks = {
    homeworksAndSubjects: []
}

const reducer = (state = homework, action: {type: string, payload: Subject[]}): Homeworks => {
    switch (action.type) {
        case 'ADD_HOMEWORK':
            return {...state, homeworksAndSubjects: action.payload}   
        default:
            return state    
    }
}

export const store = createStore(reducer)