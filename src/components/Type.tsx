import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = () => {
  return (
      <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => { 
            typewriter
                .typeString("Simple Task Manager app!! 💼✒️")
                .pauseFor(500)
                .deleteAll()
                .typeString("Add your tasks and manage them")
                .start()
          }}
      />
  )
}

export default TypewriterTitle