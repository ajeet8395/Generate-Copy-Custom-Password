import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState('');

  // useRef
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789";
    if (characters) str += "~`!@#$%^&*(){}[]-_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numbers, characters, setPassword]) // here we used setPassword for better optimization

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // optimize way and better way using useRef
    // passwordRef.current?.setSelectionRange(0, 9); // give range of selection 
    // window.navigator.clipboard.writeText(password) one way of copy is this but here we can't see bg-blue 
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, characters, passwordGenerator])

  return (
    <>
      <div className='min-h-screen flex items-center'>
        <div className='w-full max-w-xl mx-auto shadow-lg shadow-slate-700 rounded-lg px-4 py-10 hover:scale-110 hover:shadow-slate-600 transition-all duration-300 cursor-grab text-orange-500 bg-gray-800'>
          <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
            <input
              type='text'
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard} className='bg-blue-500 px-4 text-white font-bold'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={8} max={100} value={length} id='len' className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
              <label htmlFor="len">Length : {length}</label>
            </div>
            {/* NOTE THIS POINT onChange={() => { setNumbers((prev) => !prev) }}  */}
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numbers} id='num' className='cursor-pointer' onChange={() => { setNumbers((prev) => !prev) }} />
              <label htmlFor="num">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={characters} id='char' className='cursor-pointer' onChange={() => { setCharacters((prev) => !prev) }} />
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
