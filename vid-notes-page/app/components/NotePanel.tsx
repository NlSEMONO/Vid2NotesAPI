import {useState} from 'react'

interface Card {
    question: string,
    answer: string
}

interface NotePanelProps {
    cards: Card[]
}

const NotePanel = ({cards}: NotePanelProps) => {
    const [noteNum, setNoteNum] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const btnSettings = 'border p-2 px-4 sm:px-8 bg-main h-10 text-white';
    const containerSettings = 'w-10/12 mt-10 sm:w-7/12 m-auto flex justify-around';

    const notes = cards.map((card, index) => {
        return (
            <div key={index} onClick={() => setShowAnswer(!showAnswer)} className={`${containerSettings}`}>
                { showAnswer ? <h1> {card.answer} </h1>: <h1> {card.question} </h1> }
            </div>
        )
    });

    const discardCard = (index: number) => {
        cards.splice(index, 1);
        setNoteNum(Math.min(noteNum === cards.length - 1 ? noteNum - 1 : noteNum, cards.length - 1));
    }

    return (
        <>
            <div className={`${containerSettings}`}>
                {cards.length >= 0 ? notes[noteNum] : null }
            </div>
            <div>
                <button onClick={() => setNoteNum(Math.max(noteNum - 1, 0))} className={`${btnSettings}`}> Previous </button>
                <button onClick={() => setNoteNum(Math.min(noteNum + 1, cards.length - 1))} className={`${btnSettings}`}> Next </button>
                <button onClick={() => discardCard(noteNum)} className={`${btnSettings}`}> Discard </button>
            </div>
        </>
    )
}

export default NotePanel