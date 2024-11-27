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
            const resolvedParams = await params;
            setSubject(resolvedParams.subject);
        };

        fetchParams();
    }, [params]);

    return (
        subject ? <Homeworks params={subject} /> : <p></p>
    );
};

export default DayHomework;
