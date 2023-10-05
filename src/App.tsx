import './index.css'
import React, { useEffect } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Checkbox } from './components/ui/checkbox'
import { useToast } from "./components/ui/use-toast"
import TypewriterTitle from './components/Type'
import { Trash } from 'lucide-react'

export interface taskList {
    id: number,
    task: string,
    isCompleted: boolean
}

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const { toast } = useToast()
  
  const [input, setInput] = React.useState<string>('')

  const [taskList, setTaskList] = React.useState<taskList[]>(
     JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  )

  const [map, setMap] = React.useState<string>('all')

  const [filter, setFilter] = React.useState<taskList[]>([])

  const handleToggle = (id: number) => {
    setTaskList(taskList.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task
    }))
  }

  useEffect(() => {
    const filteredTasks = taskList.filter( task => {
    if (map === 'completed') {
      return task.isCompleted;
    } else if (map === 'incomplete') {
      return !task.isCompleted;
    }
    return true; // Show all tasks
    });
    
    setFilter(filteredTasks)

  }, [taskList, map])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList))
    
  }, [taskList, map])

  return (
    <div className='flex min-h-screen justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='flex flex-col'>
        <h1 className="text-3xl text-center">
          Task manager app
        </h1>
        <h1 className="text-3xl text-rose-500 text-center">
          <TypewriterTitle />
        </h1>
        <br />
        {/* {(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')} */}
        <div className='p-10 bg-rose-200 w-[24rem] space-y-4 rounded-md shadow-xl my-10 min-h-[20rem]'>
          <div className='flex gap-2'>
            <Input onKeyDown={
              (e) => {
                if (e.key === 'Enter' && input !== '') {
                  setTaskList(task => [...task, { id: Date.now(), task: input, isCompleted: false }])
                  setInput('')
                  toast({
                    title: "Task added successfully",
                    description: input,
                  })
                } else if (e.key === 'Enter' && input === '') {
                  toast({
                    variant: "destructive",
                    title: "Task cannot be empty",
                  })
                }
              }
            } placeholder='Enter task' value={input} onChange={(e) => setInput(e.target.value)} />
            <Button className='bg-blue-400 hover:bg-slate-500' onClick={() => {
              if (input !== '') {
                setTaskList(task => [...task, { id: Date.now(), task: input, isCompleted: false }])
                setInput('')
                toast({
                      title: "Task added successfully",
                      description: input,
                })
              } else {
                toast({
                  variant: "destructive",
                  title: "Task cannot be empty",
                })
              }
            }}>Add</Button>
          </div>
          {taskList.length > 0 && <div>
            <select onChange={e => setMap(e.target.value)} className='rounded-md px-1 p-1 w-30' name="" id="">
              <option className='p-2' value="all">All</option>
              <option className='p-2' value="completed">Completed</option>
              <option className='p-2' value="incomplete">Incomplete</option>
            </select>
          </div>
          }
          {
            filter.map((task, id) => (
              <div key={task.id} className='bg-gradient-to-r from-rose-100 p-2 rounded-md to-teal-100 flex justify-between items-center'>
                <label htmlFor={task.id.toString()} className={`text-xl ${task.isCompleted && 'line-through'}`}>
                  <Checkbox checked={task.isCompleted} id={task.id.toString()} className='mr-4'
                    onClick={ () => handleToggle(task.id) } /> {task.task}
                </label>
                {task.isCompleted && <span className='text-rose-500'>✅</span>}
                <div className='flex gap-2'>
                  <Button className='bg-teal-500 rounded-full' onClick={() => {
                    setTaskList(taskList.filter(task => task.id !== filter[id].id))
                  }}>❌ Delete</Button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
