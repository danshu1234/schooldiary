'use client'

import { FC, useEffect, useState } from "react";
import Homeworks from "./Homeworks";

interface Params {
    subject: string;
}

interface Props {
    params: Promise<Params>;
}

const DayHomework: FC<Props> = ({ params }) => {
    const [subject, setSubject] = useState<string | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const resolvedParams = await params; 
                setSubject(resolvedParams.subject); 
            } catch (error) {
                console.error("Ошибка при получении параметров:", error);
            }
        };

        fetchParams(); 
    }, [params]);

    return (
        subject ? <Homeworks params={subject} /> : <div>Loading...</div>
    );
};

export default DayHomework;
