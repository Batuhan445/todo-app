import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TodoItem {
  id: number;
  başlık: any;
  isDone: boolean;
}

interface NewTodoListProps {
  item: TodoItem;
  newTodoAdded: (id: number) => void;
  startEditing: (id: number, başlık: string) => void;
  deleteTodo: (id: number) => void;
}

const newTodoList: React.FunctionComponent<NewTodoListProps> = ({
  item,
  newTodoAdded,
  startEditing,
  deleteTodo,
}) => {

  const handleDeleteClick = () => {
    if (window.confirm("Listeyi silmek istediğinizden emin misiniz?")) {
      deleteTodo(item.id);
      setTimeout (() => {
        alert("Liste başarıyla silindi");
      }, 100)
      
    }
  };

  return (

    <div className="grid md:flex items-center m-auto md:w-3/5">
      

      <div
        className={`cursor-pointer border py-3 rounded px-4 m-auto md:m-0 md:w-2/3 break-all bg-blue-500 border-blue-500 text-white ${
          item.isDone ? "line-through" : ""
        }`}
        onClick={() => newTodoAdded(item.id)}
      >

        {item.başlık}
      
      </div>

      <div className="flex space-x-3 mt-2 m-auto md:ml-auto md:mt-auto">

        <button
          className="border border-blue-600 md:border-white hover:border-blue-600 bg-blue-600 md:bg-transparent hover:bg-blue-600  md:transition md:mt-0 text-white px-4 py-3 rounded"
          onClick={() => startEditing(item.id, item.başlık)}
          style={{ fontSize: "20px"}}
        >
          <FaEdit />
        </button>


        {item.isDone && (

          <button
            className="border border-red-500 md:border-white hover:border-red-500 bg-red-500 md:bg-transparent hover:bg-red-500 transition text-white px-4 py-3 rounded mr-2"
            onClick={handleDeleteClick}
            style={{ fontSize: "20px" }}
          >
            <FaTrash />
          </button>

        )}


      </div>

    </div>
  );
};

export default newTodoList;
