import { Button, Input, Spinner } from '@nextui-org/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ViewPanel from './components/ViewPanel';

function App() {

  const [todo, setTodo] = useState(null);
  const [text, setText] = useState(``);

  async function getTodo() {
    try {
      const result = await axios.get(`/todos`);
      setTodo(result);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    
  }

  async function createTodo() {
    try {
      const result = await axios.post(`/todos`, {
        "task": text
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    getTodo();
  }

  useEffect(() => {
    getTodo();
  }, [])

  if(todo == null){
    return(
      <>
        <div className='w-screen h-screen flex flex-col justify-center items-center overflow-auto'>
          <Spinner size='lg' color='danger' />
        </div>
      </>
    )
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center overflow-auto'>
      <div className='sm:w-2/5 flex justify-center items-center p-20'>
        <h1 className='sm:text-8xl text-6xl font-semibold'>Task</h1>
        <h1 className='sm:text-8xl text-6xl font-semibold text-rose-500'>ify</h1>
      </div>
      <div className='sm:w-2/5 w-80 flex flex-row justify-between items-center'>
        <Input value={text} onChange={(event) => setText(event.target.value)} size='sm' color='danger' type="text" label="Todo" className='xl:w-[84%] lg:w-[78%] md:w-[70%] w-[66%]' />
        <Button onClick={createTodo} size='lg' color='danger' variant='shadow' className='xl:w-[13%] lg:w-[20%] md:w-[25%] w-[30%]'>Submit</Button>
      </div>
      <ViewPanel todo={todo} getTodo={getTodo} />
    </div>
  )
}

export default App