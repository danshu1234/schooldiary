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

    let day;

    if (props.dayOfTheWeek == 'Wednesday') {
        day = <h2 className="wednesday">{props.dayOfTheWeek}</h2>
    } else if (props.dayOfTheWeek == 'Friday') {
        day = <h2 className="friday">{props.dayOfTheWeek}</h2>
    } else if (props.dayOfTheWeek == 'Monday' || props.dayOfTheWeek == 'Tuesday') {
        day = <h2 className="dayOfTheWeek">{props.dayOfTheWeek}</h2>
    } else if (props.dayOfTheWeek == 'Thursday') {
        day = <h2 className="thursday">{props.dayOfTheWeek}</h2>
    }

    const handleSave = () => {
        if (props.dayOfTheWeek !== 'Friday') {
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
            } 
        } else {
            const names: string[] = [name1, name2, name3, name4, name5, name6, name7];
        
            const hasRussianLetter = names.some(name => {
                return [...name].some(char => russianAlphabet.includes(char));
            });
            if (!hasRussianLetter) {
                const subjects = names.filter(item => item !== '');
                localStorage.setItem(props.type, JSON.stringify(subjects));
                props.setDay(props.day + 1);      
                localStorage.setItem('logged', 'true')  
                window.location.reload()            
                setName1('');    
                setName2(''); 
                setName3(''); 
                setName4(''); 
                setName5(''); 
                setName6(''); 
                setName7('');        
            } 
        }
        }     
    return ( 
        <div> 
            {day}
            <input value={name1} onChange={(event: ChangeEvent<HTMLInputElement>) => setName1(event.target.value)} className="input-start"/><br/> 
            <input value={name2} onChange={(event: ChangeEvent<HTMLInputElement>) => setName2(event.target.value)} className="input-start"/><br/> 
            <input value={name3} onChange={(event: ChangeEvent<HTMLInputElement>) => setName3(event.target.value)} className="input-start"/><br/> 
            <input value={name4} onChange={(event: ChangeEvent<HTMLInputElement>) => setName4(event.target.value)} className="input-start"/><br/> 
            <input value={name5} onChange={(event: ChangeEvent<HTMLInputElement>) => setName5(event.target.value)} className="input-start"/><br/> 
            <input value={name6} onChange={(event: ChangeEvent<HTMLInputElement>) => setName6(event.target.value)} className="input-start"/><br/> 
            <input value={name7} onChange={(event: ChangeEvent<HTMLInputElement>) => setName7(event.target.value)} className="input-start"/><br/> 
            <button onClick={handleSave} className="save-schedule">Сохранить</button> 
        </div> 
    ); 
} 
export default OneDaySched;
