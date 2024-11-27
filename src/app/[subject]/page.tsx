import { FC } from "react";  
import Homeworks from "./Homeworks";  

interface Params {  
    subject: string;  
}  

const DayHomework: FC<{ params: Params }> = ({ params }) => {  
    return (  
        <Homeworks params={params.subject} />  
    );  
};  

export default DayHomework;
