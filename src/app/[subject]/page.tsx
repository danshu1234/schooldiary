import { FC } from "react"; 
import Homeworks from "./Homeworks"; 
import { PageProps } from "../../../.next/types/app/layout";

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
