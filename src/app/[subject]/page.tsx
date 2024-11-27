import { FC } from "react"; 
import Homeworks from "./Homeworks"; 
interface Params { 
    subject: string; 
} 

interface Props { 
    params: Params; 
} 

const DayHomework: FC<Props> = ({ params }) => { 
    return ( 
        <Homeworks params={params.subject} /> 
    ); 
}; 

export default DayHomework;
