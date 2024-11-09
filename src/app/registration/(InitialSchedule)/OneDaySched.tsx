'use client' 
import { ChangeEvent, FC } from "react"; 
import { useState } from "react"; 
import { russianAlphabet } from "./RussianAlphabet"; 
interface Props { 
    type: string, 
    setDay: Function, 
    day: number, 
    dayOfTheWeek: string, 
} 
const OneDaySched: FC<Props> = (props) => { 
    const [name1, setName1] = useState<string>(''); 
    const [name2, setName2] = useState<string>(''); 
    const [name3, setName3] = useState<string>(''); 
    const [name4, setName4] = useState<string>(''); 
    const [name5, setName5] = useState<string>(''); 
    const [name6, setName6] = useState<string>(''); 
    const [name7, setName7] = useState<string>(''); 
    const [warn, setWarn] = useState<string>(''); 
    const handleSave = () => {
        const names: string[] = [name1, name2, name3, name4, name5, name6, name7];
        
        const hasRussianLetter = names.some(name => {
            return [...name].some(char => russianAlphabet.includes(char));
        });
        if (!hasRussianLetter) {
            const subjects = names.filter(item => item !== '');
            localStorage.setItem(props.type, JSON.stringify(subjects));
            props.setDay(props.day + 1);  
            setName1('');    
            setName2(''); 
            setName3(''); 
            setName4(''); 
            setName5(''); 
            setName6(''); 
            setName7('');        
            setWarn('');
        } else { 
            setWarn('Пожалуйста, заполните расписание на английском языке'); 
        }
    };
    return ( 
        <div> 
            <h2>{props.dayOfTheWeek}</h2> 
            <input value={name1} onChange={(event: ChangeEvent<HTMLInputElement>) => setName1(event.target.value)}/><br/> 
            <input value={name2} onChange={(event: ChangeEvent<HTMLInputElement>) => setName2(event.target.value)}/><br/> 
            <input value={name3} onChange={(event: ChangeEvent<HTMLInputElement>) => setName3(event.target.value)}/><br/> 
            <input value={name4} onChange={(event: ChangeEvent<HTMLInputElement>) => setName4(event.target.value)}/><br/> 
            <input value={name5} onChange={(event: ChangeEvent<HTMLInputElement>) => setName5(event.target.value)}/><br/> 
            <input value={name6} onChange={(event: ChangeEvent<HTMLInputElement>) => setName6(event.target.value)}/><br/> 
            <input value={name7} onChange={(event: ChangeEvent<HTMLInputElement>) => setName7(event.target.value)}/><br/> 
            <button onClick={handleSave}>Сохранить</button> 
            {warn && <div>{warn}</div>} 
        </div> 
    ); 
} 
export default OneDaySched;
