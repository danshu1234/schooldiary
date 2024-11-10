'use client'

import './initial.css'
import { FC, useState } from "react"
import OneDaySched from './OneDaySched'

const Days: FC = () => {
    const [day, setDay] = useState<number>(1);
    let schedual;

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


    return (
        <div className='initial-contain'>
            <h2 className='start'>Для начала заполните ваш дневник</h2>
            <h3 className='instruction'>(пожалуйста, заполняйте расписание на английском языке)</h3>
            {schedual}
        </div>
    );
}

export default Days;

