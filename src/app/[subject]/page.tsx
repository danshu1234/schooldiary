import { FC } from "react";
import Homeworks from "./Homeworks";

interface Props {
    params: {
        subject: string
    }
}

const DayHomework: FC <Props> = ({params}) => {
    return (
        <Homeworks params = {params.subject}/>
    )
}

export default DayHomework