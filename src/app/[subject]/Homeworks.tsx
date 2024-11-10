'use client'

import { ChangeEvent, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import './homeworks.css'

interface Props {
params: string,
}

interface Subject {
subject: string,
homeworks: string[],
}

interface Homeworks {
homeworksAndSubjects: Subject[]
}

const Homeworks: FC <Props> = (props) => {

const homeworks = useSelector((state: Homeworks) => state.homeworksAndSubjects)
const dispatch = useDispatch()
const [homew, setHomew] = useState <JSX.Element | null> (null); 
const [input, setInput] = useState <string> ('')
const [img, setImg] = useState <string> ('')
const [err, setErr] = useState <boolean> (false)
const [warn, setWarn] = useState <boolean> (false)
let error;
let image;
let warning;
const filteredArr = homeworks.filter(el => el.subject !== props.params)
const findSubject = homeworks.find(el => el.subject === props.params)
if (warn) {
    warning = <div className="agree-delete-all">
        <p>Вы уверены, что хотите удалить все ДЗ для этого предмета?</p>
        <p onClick={() => {
            dispatch({type: 'ADD_HOMEWORK', payload: filteredArr})
            setWarn(false)
            localStorage.setItem('homeworks', JSON.stringify(filteredArr))
        }} className="agree-btn">Да</p>
        <p onClick={() => setWarn(false)} className="agree-btn">Нет</p>
    </div>
}

if (err) {
    error = <div className="agree-delete-all">
        <p>Ой, похоже вы добавили слишком много фото</p>
        <p onClick={() => setErr(false)} className="ok">Понятно</p>
        </div>
}

if (img !== '') {
    image = <div>
        <img src={img} width={400} height={300} className="big-img"/>
        <p onClick={() => setImg('')} className="close-photo">X</p>
        </div>
}

useEffect(() => {
    if (homeworks.length !== 0) {
        try {
            localStorage.setItem('homeworks', JSON.stringify(homeworks))
        } catch (e) {
            setErr(true)
            const getStorage = localStorage.getItem('homeworks')
            if (getStorage) {
                dispatch({type: 'ADD_HOMEWORK', payload: JSON.parse(getStorage)})
            }
        }
    }
}, [homeworks])

useEffect(() => {
    const getHomeworks = localStorage.getItem('homeworks')
    if (getHomeworks) {
        dispatch({type: 'ADD_HOMEWORK', payload: JSON.parse(getHomeworks)})
    }
}, [])

useEffect(() => {
    if (findSubject === undefined) {
        setHomew(<h3 className="nothing">По этому предмету пока ничего не задали</h3>)
    } else {
        setHomew(<div>
            <ul>
            {findSubject.homeworks.map((item, index) => {
    return (
        <li key={index} className="li-homework">
            <div className="homework-item">
                {item.split('').find(el => el === '/') ? (
                    <img src={item} width={60} height={60} onClick={() => setImg(item)} className="mini-img" />
                ) : (
                    <p>{item}</p>
                )}
                <button onClick={() => {
                    const withDelete = {
                        subject: findSubject?.subject,
                        homeworks: findSubject?.homeworks.filter(el => el !== item)
                    };
                    if (withDelete.homeworks?.length === 0) {
                        setHomew(<h3>По этому предмету пока ничего не задали</h3>);
                        dispatch({type: 'ADD_HOMEWORK', payload: filteredArr});
                        localStorage.setItem('homeworks', JSON.stringify(filteredArr));
                    } else {
                        dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, withDelete]});
                    }
                }} className="delete-homework">Удалить</button>
            </div>
        </li>
    );
})}
                  
            </ul>
        </div>)
    }       
}, [homeworks])
return (
    <div className="homeworks-main">
        <h2 className="lesson-name">{props.params}</h2>

        <div className="input-container">
    <input 
        value={input} 
        placeholder="домашнее задание" 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} 
        className="add-homework"
    />
    <button onClick={() => {
        if (input !== '') {
            if (findSubject === undefined) {
                dispatch({type: 'ADD_HOMEWORK', payload: [...homeworks, {subject: props.params, homeworks: [input]}]});
            } else {
                dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, {subject: findSubject.subject, homeworks: [input, ...findSubject.homeworks]}]});
            }
            setInput('');
        }
    }} className="save-homework">Сохранить</button>

    <input 
        type="file" 
        id="file-upload" 
        style={{ display: 'none' }} 
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;  
            if (files) {
                const file = files[0];
                if (file) {                  
                    const reader = new FileReader();               
                    reader.onload = (e) => {
                        if (findSubject === undefined) {
                            dispatch({type: 'ADD_HOMEWORK', payload: [...homeworks, {subject: props.params, homeworks: [e.target?.result]}]});
                        } else {
                            dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, {subject: props.params, homeworks: [e.target?.result, ...findSubject.homeworks]}]});
                        }
                    };
                    reader.readAsDataURL(file); 
                }
            }
        }} 
    />
    
    <button 
        onClick={() => document.getElementById('file-upload')?.click()} 
        className="add-photo-button"
    >
        Добавить фото
    </button>

    {findSubject !== undefined && 
        <button onClick={() => setWarn(true)} className="clear-homework">Очистить все ДЗ</button>
    }
</div>


        <div>
            {homew}
        </div>

        {image}
        {error}
        {warning}
    </div>
);



}

export default Homeworks