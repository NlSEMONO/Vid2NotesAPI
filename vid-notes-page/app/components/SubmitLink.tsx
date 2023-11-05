'use client'

import {useState} from 'react'
import {center, header} from './UsefulConstants';
import NotePanel from './NotePanel';

const HOST = 'http://localhost:8000';

interface Card {
    question: string,
    answer: string
}

const SubmitLink = () => {
    const containerSettings = 'w-10/12 mt-10 sm:w-7/12 m-auto flex justify-around';
    const fieldSettings = 'w-7/12 h-10 border-2';
    const btnSettings = 'border p-2 px-4 sm:px-8 bg-main h-10 text-white';
    const [notes, setNotes] = useState<string[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [notesActive, setNotesActive] = useState<boolean>(true);
    const [hasNotes, setHasNotes] = useState<boolean>(false);
    const [hasCards, setHasCards] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [link, setLink] = useState<string>('default');

    setTimeout(() => console.log(loading, notesActive, hasCards), 1000);

    const handleClick = () => {
        setLoading(true);
        setHasNotes(true);
        if (link === 'default') {
            window.alert('Invalid Link');
            return;
        }
        fetch(`${HOST}/get-notes?link=${link}`).then(
            res => res.json()
        ).then(
            data => {
                setNotes(data); 
                setHasNotes(true); 
                setLoading(false); 
                setTimeout(() => console.log(loading, data), 1000)
            }
        )
    }

    const toCards = () => {
        setLoading(true);
        if (hasCards && hasNotes) setNotesActive(!notesActive);
        setHasCards(true);

        fetch(`${HOST}/get-cards`, {
            method: 'POST',
            body: JSON.stringify(notes),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(
            data => {
                setLoading(false);
                let cards: Card[] = [];
                for (let i = 0; i < data['questions'].length; i++) {
                    cards.push({question: data['questions'][i], answer: data['answers'][i]});
                }
                setCards(cards);
            }
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
                    <h1 className={`${center} ${header} mb-4 font-bold`}> Notes </h1>
                    {loading ? <h1 className={`${center}`}> Loading... </h1> : (
                        <>
                            {notesActive ? <ol className='list-disc'> {noteToBullets} </ol> : <NotePanel cards={cards}/>}
                            <button value={notesActive ? `To Question Cards` : `To Notes`} onClick={() => toCards()} className={`${btnSettings}`}></button>
                        </>
                    )}
                </div>
            </>: null}
        </>
    );
}

export default SubmitLink