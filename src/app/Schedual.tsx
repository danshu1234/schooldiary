import './schedual.css'
import Link from "next/link"
import { FC } from "react"


const DaySched: FC = () => {

    const monday = localStorage.getItem('monday-lessons')
    const tuesday = localStorage.getItem('tuesday-lessons')
    const wednesday = localStorage.getItem('wednesday-lessons')
    const thursday = localStorage.getItem('thursday-lessons')
    const friday = localStorage.getItem('friday-lessons')

    return (
        <div className="schedual-contain">
            <div className='day-contain'>
            <h2 className='day'>Monday</h2>
            <ul className='lessons-list'>
            {monday? (
                JSON.parse(monday).map((item: string, index: any) => <li key={index} className='lesson'><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            </div>

            <div className='day-contain'>
            <h2 className='day'>Tuesday</h2>
            <ul className='lessons-list'>
            {tuesday? (
                JSON.parse(tuesday).map((item: string, index: any) => <li key={index} className='lesson'><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            </div>

            <div className='day-contain'>
            <h2 className='day'>Wednesday</h2>
            <ul className='lessons-list'>
            {wednesday? (
                JSON.parse(wednesday).map((item: string, index: any) => <li key={index} className='lesson'><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            </div>

            <div className='day-contain'>
            <h2 className='day'>Thursday</h2>
            <ul className='lessons-list'>
            {thursday? (
                JSON.parse(thursday).map((item: string, index: any) => <li key={index} className='lesson'><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            </div>

            <div className='day-contain'>
            <h2 className='day'>Friday</h2>
            <ul className='lessons-list'>
            {friday? (
                JSON.parse(friday).map((item: string, index: any) => <li key={index} className='lesson'><Link href={`/${item}`}>{item}</Link></li>)
            ) : null}
            </ul>
            </div>
        </div>
    )
}

export default DaySched