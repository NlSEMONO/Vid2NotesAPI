import Image from 'next/image'
import SubmitLink from './components/SubmitLink';
import Navbar from './components/Navbar';
import { center, header } from './components/UsefulConstants';

export default function Home() {
  const imageSettings = 'w-48 m-auto mt-10 mb-10';
  const usageSettings = 'w-6/12 m-auto mt-10';

  return (
    <>
      <Navbar/>
      <img className={`${imageSettings}`} src='/vid2notes.svg'/>
      <SubmitLink/>
      <div id='usage' className={`${usageSettings}`}>
        <h1 className={`${center} ${header}`}> Usage Instructions </h1><br/>
        <ol className='list-decimal'>
          <li> Find a YouTube video and copy its link </li>
          <li> Paste the link in input field that says paste here </li>
          <li> Expect notes back in a few seconds </li>
        </ol>
      </div>
    </>
  );
}
