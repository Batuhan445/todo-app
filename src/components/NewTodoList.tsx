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

  return (

    <div className="grid md:flex md:justify-between items-center m-auto  md:w-3/5">

      <div
        className={`cursor-pointer border py-3 rounded px-4 m-auto md:m-0 md:w-2/3 bg-blue-500 border-blue-500 text-white max-w-xl overflow-x-auto  ${
          item.isDone ? "line-through" : ""
        }`}
        onClick={() => newTodoAdded(item.id)}
      >

        {item.başlık}

      </div>

      <div className="flex space-x-1 mt-2 md:m-0 m-auto md:mt-0">

        {item.isDone && (

          <button
            className="border border-red-500 bg-red-500 text-white px-4 py-3 rounded mr-2"
            onClick={() => deleteTodo(item.id)}
            style={{ fontSize: "20px" }}
          >
            <FaTrash />
          </button>

        )}

        <button
          className="border md:mt-0 border-blue-500 bg-blue-500 text-white px-4 py-3 rounded"
          onClick={() => startEditing(item.id, item.başlık)}
          style={{ fontSize: "20px"}}
        >
          <FaEdit />
        </button>

      </div>

    </div>
  );
};

export default newTodoList;
