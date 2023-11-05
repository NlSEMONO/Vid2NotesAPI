import {useState} from 'react'

interface Card {
    question: string,
    answer: string
}


interface DeleteCard {
    question: string,
    answer: string, 
    deleted: boolean
}

interface NotePanelProps {
    cards: Card[]
}

const NotePanel = ({cards}: NotePanelProps) => {
    const [noteNum, setNoteNum] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const btnSettings = 'border p-2 px-4 sm:px-8 bg-main h-10 text-white';
    const containerSettings = 'w-10/12 mt-10 sm:w-7/12 m-auto flex justify-around';
    const [deletedNotes, setDeletedNotes] = useState<boolean[]>(Array(cards.length).fill(false));
    // const [deletedCount, setDeletedCount] = useState<number>(0);
    // const deletedCards: DeleteCard[] = cards.map((card, index) => {
    //     return {
    //         question: card.question,
    //         answer: card.answer,
    //         deleted: deletedNotes[index]
    //     }
    // });
    const currentIndexToOriginalIndex: number[] = [];
    for (let i = 0; i < cards.length; i++) {
        if (!deletedNotes[i]) {
            currentIndexToOriginalIndex.push(i);
        } 
    }

    const notes = [];
    for (let i = 0; i < cards.length; i++) {
        if (deletedNotes[i]) {
            continue;
        }
        notes.push(
            <div className='border-2 h-40 w-10/12 sm:2/12 m-auto' onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? cards[i].answer : cards[i].question}
            </div>
        )
    }

    const increment = (delta: number) => {
        setTimeout(() => console.log('nn', noteNum, 'asdasd', notes.length), 1000);
        if (noteNum + delta < 0) {
            setNoteNum(notes.length - 1);
        } else if (noteNum + delta >= notes.length) {
            setNoteNum(0);
        } else {
            setNoteNum(noteNum + delta);
        }
    }

    const discardCard = (index: number) => {
        let temp = [...deletedNotes];
        temp[currentIndexToOriginalIndex[index]] = true;
        setDeletedNotes(temp);
        setNoteNum(Math.min(notes.length - 1, notes.length - 1 === noteNum ? noteNum - 1 : noteNum));
    }

    return (
        <div className=''>
            <div className='border-2 h-40 w-10/12 sm:2/12 m-auto'>
                {cards.length >= 0 ? notes[noteNum] :  <p className='border-style-none w-fit h-fit'> No Cards </p>}
            </div>
            <div className={`${containerSettings}`}>
                <button onClick={() => increment(-1)} className={`${btnSettings}`}> Previous </button>
                <button onClick={() => increment(1)} className={`${btnSettings}`}> Next </button>
                <button onClick={() => discardCard(noteNum)} className={`${btnSettings}`}> Discard </button>
            </div>
        </div>
    )
}

export default NotePanel