'use client'

import { FC, useEffect } from "react";
import InitialSchedule from "./registration/(InitialSchedule)/initialSchedule";
import DaySched from "./Schedual";

const Start: FC = () => {

    useEffect(() => {

    }, [])

    return (
        <div>
            {localStorage.getItem('logged')? <DaySched/> : <InitialSchedule/>}
        </div>
    )
}

export default Start