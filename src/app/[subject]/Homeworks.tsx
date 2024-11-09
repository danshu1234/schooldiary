'use client'

import { ChangeEvent, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

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
    warning = <div>
        <p>Вы уверены, что хотите удалить все ДЗ для этого предмета?</p>
        <button onClick={() => {
            dispatch({type: 'ADD_HOMEWORK', payload: filteredArr})
            setWarn(false)
            localStorage.setItem('homeworks', JSON.stringify(filteredArr))
        }}>Да</button>
    </div>
}

if (err) {
    error = <div>
        <h3>Ой, похоже вы добавили слишком много фото</h3>
        <p onClick={() => setErr(false)}>Понятно</p>
        </div>
}

if (img !== '') {
    image = <div>
        <img src={img} width={200} height={200}/>
        <p onClick={() => setImg('')}>Закрыть</p>
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
        setHomew(<h3>По этому предмету пока ничего не задали</h3>)
    } else {
        setHomew(<div>
            <ul>
                {findSubject.homeworks.map((item, index) => {
                    return <li key={index}>
                        <div>
                        {item.split('').find(el => el === '/') ? <img src={item} width={60} height={60} onClick={() => setImg(item)}/> : <p>{item}</p>}
                        <button onClick={() => {
                               const withDelete = {subject: findSubject?.subject, homeworks: findSubject?.homeworks.filter(el => el !== item)}       
                               if (withDelete.homeworks?.length === 0) {
                                setHomew(<h3>По этому предмету пока ничего не задали</h3>)
                                dispatch({type: 'ADD_HOMEWORK', payload: filteredArr})
                                localStorage.setItem('homeworks', JSON.stringify(filteredArr))
                               } else {
                                dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, withDelete]})
                               }                
                        }}>Удалить</button>
                        </div>
                        </li>
                })}                  
            </ul>
        </div>)
    }       
}, [homeworks])
return (
    <div>
    <h2>{props.params}</h2>
    {findSubject !== undefined ? <button onClick={() => setWarn(true)}>Очистить все ДЗ</button> : null}
    {homew}
    <input value={input} placeholder="Добавить ДЗ" onChange={(event: ChangeEvent <HTMLInputElement>) => setInput(event.target.value)}/>
    <button onClick={() => {
        if (input !== '') {
            if (findSubject === undefined) {
                dispatch({type: 'ADD_HOMEWORK', payload: [...homeworks, {subject: props.params, homeworks: [input]}]})
            } else {
               dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, {subject: findSubject.subject, homeworks: [input, ...findSubject.homeworks]}]})
            }
            setInput('')                             
        }
    }}>Сохранить</button>
    <input type="file" onChange={(event: ChangeEvent <HTMLInputElement>) => {
        const files = event.target.files;  
        if (files) {
            const file = files[0]
            if (file) {                  
                const reader = new FileReader();               
                reader.onload = (e) => {
                    if (findSubject === undefined) {
                        dispatch({type: 'ADD_HOMEWORK', payload: [...homeworks, {subject: props.params, homeworks: [e.target?.result]}]})
                    } else {
                        dispatch({type: 'ADD_HOMEWORK', payload: [...filteredArr, {subject: props.params, homeworks: [e.target?.result, ...findSubject.homeworks]}]})
                    }
                };
                reader.readAsDataURL(file); 
        }
    }}}/>
    {image}
    {error}
    {warning}
    </div>
)
}

export default Homeworks