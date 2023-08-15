import React from 'react'


interface NewTodoAddProps {
  onTodoAddButton: () => void
}

const NewTodoAddButton: React.FunctionComponent<NewTodoAddProps> = ({onTodoAddButton}) => {

  return (

    <div>

        <button className='ml-4 border px-2 py-1 bg-blue-500 text-white rounded' 
        onClick={onTodoAddButton}
        > 

        Ekle 
        
        </button>
        
    </div>
  )

}

export default NewTodoAddButton

