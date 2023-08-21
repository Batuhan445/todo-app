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
  deleteTodo: (id: number) => void
}

const newTodoList: React.FunctionComponent<NewTodoListProps> = ({
  item,
  newTodoAdded,
  startEditing,
  deleteTodo
}) => {

  return (

    <div className="flex justify-between items-center m-auto  w-3/5">

      <div
        className={`cursor-pointer border py-3 rounded w-2/3 pl-4 bg-blue-500 border-blue-500 text-white ${
          item.isDone ? "line-through" : ""
        }`}
        onClick={() => newTodoAdded(item.id)}
      >

        {item.başlık}

      </div>

      <div className="flex items-center space-x-1">
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
        style={{ fontSize: "20px" }}
      >

        <FaEdit />

      </button>

</div>
    </div>
  );
};

export default newTodoList;

