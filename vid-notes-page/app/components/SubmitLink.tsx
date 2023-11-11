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
    const toggleViewSettings = 'border p-2 px-4 sm:px-8 bg-main h-10 text-white w-max-9/12 w-fit m-auto';
    const usageSettings = 'w-6/12 m-auto mt-10';

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
        if (hasCards && hasNotes){
            setNotesActive(!notesActive);
            return;
        }
        setLoading(true);
        setHasCards(true);

        fetch(`${HOST}/get-cards`, {
            method: 'POST',
            body: JSON.stringify({'notes': notes}),
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
                    cards.push({question: data['questions'][i], answer: data['answers'][i+1]});
                }
                setCards(cards);
                setNotesActive(false);
                setTimeout(() => console.log(cards), 1000);
            }
        )
    }

    const noteToBullets = (hasNotes) ? notes.map((note, index) => {
        return (
            <li key={index}> {note} </li>
        )
    }) : null;

    // const effectiveCards = []
    // for (let i=1;i<cards.length;i++) {
    //     effectiveCards.push(cards[i])
    // }

    return (
        <div>
            <div>
                <div className={`${containerSettings}`}>
                    <input type='text' className={`${fieldSettings}`} onChange={e => setLink(e.target.value)} placeholder='Paste Link to Video here!'/>
                    <button className={`${btnSettings}`} onClick={() => handleClick()}> Submit </button>
                </div>
                {hasNotes ? 
                <>
                    <br/> <div className={notesActive ? `w-7/12 m-auto` : 'w-10/12 sm:7/12 m-auto h-40'}>
                        <h1 className={`${center} ${header} mb-4 font-bold`}> Notes </h1>
                        {loading ? <h1 className={`${center}`}> Loading... </h1> : (
                            <>
                                {notesActive ? <ol className='list-disc'> {noteToBullets} </ol> : <NotePanel cards={cards}/>}
                                <div className={`w-fit m-auto`}>
                                    <button onClick={() => toCards()} className={`${toggleViewSettings} ${center}`}>{notesActive ? `To Question Cards` : `To Notes`}</button>
                                </div>
                            </>
                        )}
                    </div>
                </>: null}
            </div>
            <div id='usage' className={`${hasNotes ? 'hidden': 'block'} ${usageSettings}`}>
                <h1 className={`${center} ${header}`}> Usage Instructions </h1><br/>
                <ol className='list-decimal'>
                <li> Find a YouTube video and copy its link </li>
                <li> Paste the link in input field that says paste here </li>
                <li> Expect notes back in a few seconds </li>
                </ol>
            </div>
        </div>
    );
}

export default SubmitLink