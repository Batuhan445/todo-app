"use client";
import React, { useEffect, useState } from "react";
import NewTodoInput from "@/components/NewTodoInput";
import NewTodoAddButton from "@/components/NewTodoAddButton";
import ClearCompleteButton from "@/components/ClearCompleteButton";
import { loadListFromLocalStorage, saveListToLocalStorage } from "@/components/LocalStroage";
import moment from "moment";
import "moment/locale/tr";
import TodoDate from "@/components/TodoDate";

interface todoListesi {
  id: number;
  başlık: any;
  tamamlandı: boolean;
  oluşturmaTarihi: string;
}

export default function Page() {
  const [liste, setListe] = useState<todoListesi[]>([]);
  const [yeniBaşlık, setYeniBaşlık] = useState<string>("");
  const [editingItemIds, setEditingItemIds] = useState<number[]>([]);
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>({});
  
  

  // Save to Local Stroage

  useEffect(() => {
    const storedList = loadListFromLocalStorage();
    if (storedList) {
      setListe(storedList);
    }
  }, []);

  useEffect(() => {
    saveListToLocalStorage(liste);
  }, [liste]);

  // Add New Todo

  const yeniTodoEkle = () => {
    if (yeniBaşlık.trim() !== "") {
      const IdNumber = liste.length + 1;
      const newTodo: todoListesi = {
        id: IdNumber,
        başlık: yeniBaşlık,
        tamamlandı: false,
        oluşturmaTarihi: moment().format("DD-MM-YYYY HH:mm:ss"),
      };
      setListe([...liste, newTodo]);
      setYeniBaşlık("");
    }
  };

  // New todo add is done

  const tamamlandıİşlemi = (id: number) => {
    setListe(
      liste.map((eleman) =>
        eleman.id === id
          ? { ...eleman, tamamlandı: !eleman.tamamlandı }
          : eleman
      )
    );
  };
  
  // Start Edit Todo

  const startEditing = (id: number, title: string) => {
    setEditingItemIds((prevIds) => [...prevIds, id]);
    setEditedTitles((prevTitles) => ({ ...prevTitles, [id]: title }));
  };

  // After editing is saving

  const saveEditedTitle = (id: number) => {
    setListe((prevListe) =>
      prevListe.map((item) =>
        item.id === id ? { ...item, başlık: editedTitles[id] } : item
      )
    );
    cancelEditing(id);
  };
  
  // Todo Edit Cancel
  
  const cancelEditing = (id: number) => {
    setEditingItemIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    setEditedTitles((prevTitles) => {
      const newTitles = { ...prevTitles };
      delete newTitles[id];
      return newTitles;
    });
  };

  // Clear Todo List

  const clearIsDone = () => {
    const afterClearUpdateID = liste.filter((item) => !item.tamamlandı);

    const updatedListWithID = afterClearUpdateID.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setListe(updatedListWithID);
  };

  const clearButton = liste.some((item) => item.tamamlandı);

  // On browser Page

  return (
    <div className="mt-10">

      <h1 className="text-center text-3xl">Todo App</h1>

      <div className="flex justify-center mt-4">
        <NewTodoInput
          value={yeniBaşlık}
          onChange={setYeniBaşlık}
          onEnterKey={yeniTodoEkle}
        />

        <NewTodoAddButton onTodoAddButton={() => yeniTodoEkle()} />

      </div>

      <div className="mt-4">
        <div className="overflow-y-auto h-[30rem] md:h-80 w-3/5 m-auto border-4 rounded-xl">
          {liste.map((item) => (

            <div className="grid md:flex md:py-2 md:flex-row gap-4 items-center border-b-4 border-gray-500">

              <div className="text-center mt-2 md:mt-0 md:ml-4 md:w-8">#{item.id}</div>

              {editingItemIds.includes(item.id) ? (

                <div className="w-2/3 flex justify-between">

                  <input
                    className="border m-auto px-2 py-1 rounded w-1/2"
                    value={editedTitles[item.id] || ""}
                    onChange={(e) =>
                      setEditedTitles((previousTitle) => ({
                        ...previousTitle,
                        [item.id]: e.target.value,
                      }))
                    }
                  />

                  <div className="flex space-x-1">

                    <button
                      className="border ml-auto bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => saveEditedTitle(item.id)}
                    >
                      Kaydet
                    </button>

                    <button
                      className="border bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => cancelEditing(item.id)}
                    >
                      İptal
                    </button>

                  </div>

                </div>

              ) : (

                <div className="grid grid-flow-row items-center m-auto md:flex w-2/3">

                  <div
                    className={`cursor-pointer border m-auto px-2 py-1 rounded w-1/2 text-center bg-blue-500 text-white ${
                      item.tamamlandı ? "bg-red-500" : ""
                    }`}
                    onClick={() => tamamlandıİşlemi(item.id)}
                  >
                    {item.başlık}
                  </div>

                  <button
                    className="border md:ml-auto bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => startEditing(item.id, item.başlık)}
                  >
                    Düzenle
                  </button>

                </div>

              )}


              <TodoDate creationDate={item.oluşturmaTarihi} />


            </div>

          ))}

        </div>

      </div>

      <div className="flex justify-center mt-4">
        {clearButton && <ClearCompleteButton onClearCompleted={clearIsDone} />}
      </div>
    </div>
  );
}

