'use client'

import './initial.css'
import { FC, useEffect, useState } from "react"
import OneDaySched from './OneDaySched'

const Days: FC = () => {
    const [day, setDay] = useState<number>(1);
    const [home, setHome] = useState<boolean>(false);
    const [start, setStart] = useState <boolean> (true)
    let schedual;
    let goHome;
    let starting;

    if (start) {
        starting = <h2>Для начала заполните ваш дневник...</h2>
    }

    if (home) {
        goHome = (
            <div>
            <button onClick={() => {
                localStorage.setItem('logged', 'true')  
                window.location.reload()
            }}>Подтвердить заполнение</button>
            <div>
            </div>
            </div>
        );
    }

    if (day === 1) {
        schedual = <OneDaySched type={'monday-lessons'} setDay={setDay} day={day} dayOfTheWeek={'Monday'} />;
    } else if (day === 2) {
        schedual = <OneDaySched type={'tuesday-lessons'} setDay={setDay} day={day} dayOfTheWeek={'Tuesday'} />;
    } else if (day === 3) {
        schedual = <OneDaySched type={'wednesday-lessons'} setDay={setDay} day={day} dayOfTheWeek={'Wednesday'} />;
    } else if (day === 4) {
        schedual = <OneDaySched type={'thursday-lessons'} setDay={setDay} day={day} dayOfTheWeek={'Thursday'} />;
    } else if (day === 5) {
        schedual = <OneDaySched type={'friday-lessons'} setDay={setDay} day={day} dayOfTheWeek={'Friday'} />;
    }

    useEffect(() => {
        if (day === 6) {
            setHome(true);
        }
    }, [day]);

    useEffect(() => {
        if (day > 2) {
            setStart(false)
        }
    }, [day]);

    return (
        <div>
            {starting}
            {schedual}
            {goHome}
        </div>
    );
}

export default Days;

