import React from 'react'
import { FaPlus } from 'react-icons/fa';


interface NewTodoAddProps {
  onTodoAddButton: () => void
}

const NewTodoAddButton: React.FunctionComponent<NewTodoAddProps> = ({onTodoAddButton}) => {

  return (

    <div>

        <button className='ml-4 border border-blue-500 px-7 py-4 bg-blue-500 text-white rounded' 
        onClick={onTodoAddButton}
        style={{fontSize: "24px"}}
        > 

        <FaPlus/>
        
        </button>
        
    </div>
  )

}

export default NewTodoAddButton

