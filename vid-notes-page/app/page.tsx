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
      <div className='flex flex-col h-'>
        <SubmitLink/>
      </div>
    </>
  );
}
