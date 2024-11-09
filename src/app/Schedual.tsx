
import Link from "next/link"
import { FC } from "react"


const DaySched: FC = () => {

    const monday = localStorage.getItem('monday-lessons')
    const tuesday = localStorage.getItem('monday-lessons')
    const wednesday = localStorage.getItem('monday-lessons')
    const thursday = localStorage.getItem('monday-lessons')
    const friday = localStorage.getItem('monday-lessons')

    return (
        <div>
            <h2>Monday</h2>
            <ul>
            {monday? (
                JSON.parse(monday).map((item: string, index: any) => <li key={index}><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            
            <h2>Tuesday</h2>
            <ul>
            {tuesday? (
                JSON.parse(tuesday).map((item: string, index: any) => <li key={index}><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>

            <h2>Wednesday</h2>
            <ul>
            {wednesday? (
                JSON.parse(wednesday).map((item: string, index: any) => <li key={index}><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>

            <h2>Thursday</h2>
            <ul>
            {thursday? (
                JSON.parse(thursday).map((item: string, index: any) => <li key={index}><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>

            <h2>Friday</h2>
            <ul>
            {friday? (
                JSON.parse(friday).map((item: string, index: any) => <li key={index}><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
        </div>
    )
}

export default DaySched