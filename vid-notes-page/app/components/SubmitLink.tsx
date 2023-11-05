'use client'

import {useState} from 'react'
import {center, header} from './UsefulConstants';

const HOST = 'http://localhost:8000';

const SubmitLink = () => {
    const containerSettings = 'w-10/12 mt-10 sm:w-7/12 m-auto flex justify-around';
    const fieldSettings = 'w-7/12 h-10 border-2';
    const btnSettings = 'border p-2 px-4 sm:px-8 bg-main h-10 text-white';
    const [notes, setNotes] = useState<string[]>([]);
    const [hasNotes, setHasNotes] = useState<boolean>(false);
    const [link, setLink] = useState<string>('default');

    const handleClick = () => {
        if (link === 'default') {
            window.alert('Invalid Link');
            return;
        }
        fetch(`${HOST}/get-notes?link=${link}`).then(
            res => res.json()
        ).then(
            data => {setNotes(data); setHasNotes(true); setTimeout(() => console.log(data), 1000)}
        )
    }

    const noteToBullets = (hasNotes) ? notes.map((note, index) => {
        return (
            <li key={index}> {note} </li>
        )
    }) : null;

    return (
        <>
            <div className={`${containerSettings}`}>
                <input type='text' className={`${fieldSettings}`} onChange={e => setLink(e.target.value)} placeholder='Paste Link to Video here!'/>
                <button className={`${btnSettings}`} onClick={() => handleClick()}> Submit </button>
            </div>
            {hasNotes ? 
            <>
                <br/> <div className={`w-7/12 m-auto`}>
                    <h1 className={`${center} ${header} mb-4`}> Notes </h1>
                    <ul className={`list-disc`}> {noteToBullets} </ul> 
                </div>
            </>: null}
        </>
    );
}

export default SubmitLink