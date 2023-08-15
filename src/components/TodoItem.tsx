import moment from "moment";
import React, { useState } from "react";

interface TodoItemProps {
  todo: string;
  onTodoChange: (updatedTodo: string) => void;
  onTodoRemove: () => void;
  
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onTodoChange, onTodoRemove}) => {

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedTodo, setUpdatedTodo] = useState<string>(todo);

  const handleEditButtonClick = () => { //düzenleme
    setIsEditMode(true);
  };

  const handleSaveButtonClick = () => { // düzenledikten sonra kaydetme
    setIsEditMode(false);
    onTodoChange(updatedTodo);
  };

  const handleCancelButtonClick = () => { // düzenlerken iptal etmek için
    setIsEditMode(false);
    setUpdatedTodo(todo);
  };

  return (

    <div className="flex items-center mb-2">

      {isEditMode ? (

        <input
          type="text"
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)} // düzenlerken çalışan method
          className="border border-gray-300 px-4 py-2 rounded w-64"
        />

      ) : (

        <div className="border border-gray-300 px-4 py-2 rounded w-64">
          {todo}
        </div>

      )}

      {isEditMode ? ( // todo yu düzenlerken kaydetme yada iptal işlemi
        <>

          <button
            onClick={handleSaveButtonClick} // düzenledikten sonra kaydet
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          >
            Kaydet
          </button>
          
          <button
            onClick={handleCancelButtonClick} // düzenlerken iptal etme
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          >
            İptal
          </button>

        </>
      ) : ( //todo yu kaydettikten sonra/oluşturduktan sonra düzenleme yada silme işlemi
        <>
          <button
            onClick={handleEditButtonClick} // düzenleme işlemi
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          >
            Düzenle
          </button>
          
          <button
            onClick={onTodoRemove} //silme işlemi
            className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
          >
            Sil
          </button>

          

        </>

      )}

    </div>

  );
};

export default TodoItem;
