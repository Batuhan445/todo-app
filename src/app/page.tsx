"use client";
import React, { useEffect, useState } from "react";
import NewTodoInput from "@/components/NewTodoInput";
import NewTodoAddButton from "@/components/NewTodoAddButton";
import ClearCompleteButton from "@/components/ClearCompleteButton";
import {loadListFromLocalStorage, saveListToLocalStorage} from "@/components/LocalStroage";
import NewTodoList from "@/components/NewTodoList";
import moment from "moment";
import "moment/locale/tr";
import TodoDate from "@/components/TodoDate";
import Image from "next/image";
import { FaEdit, FaTimes } from "react-icons/fa";
import { LuSave } from "react-icons/lu";

interface todoListesi {
  id: number;
  başlık: any;
  isDone: boolean;
  oluşturmaTarihi: string;
  düzenlemeTarihi: string;
}

export default function Page() {
  const [liste, setListe] = useState<todoListesi[]>([]);
  const [yeniBaşlık, setYeniBaşlık] = useState<string>("");
  const [editingItemIds, setEditingItemIds] = useState<number[]>([]);
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>(
    {}
  );

  

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
        isDone: false,
        oluşturmaTarihi: moment().format("DD-MM-YYYY HH:mm:ss"),
        düzenlemeTarihi: "",
      };
      setListe([...liste, newTodo]);
      setYeniBaşlık("");
    }
  };

  // New todo add is done

  const newTodoAppIsDone = (id: number) => {
    setListe(
      liste.map((eleman) =>
        eleman.id === id ? { ...eleman, isDone: !eleman.isDone } : eleman
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
        item.id === id
          ? {
              ...item,
              başlık: editedTitles[id],
              düzenlemeTarihi: moment().format("DD-MM-YYYY HH:mm:ss"),
            }
          : item
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
    const afterClearUpdateID = liste.filter((item) => !item.isDone);

    const updatedListWithID = afterClearUpdateID.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setListe(updatedListWithID);
  };

  const clearButton = liste.some((item) => item.isDone);

  // On browser Page

  return (
    <div className="mt-10">

      <div className="fixed inset-0">
        <Image
          src="/img/background.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      <div className="relative">

        <h1 className="text-center text-3xl text-white">Todo App</h1>

        <div className="flex justify-center mt-4">
          <NewTodoInput
            value={yeniBaşlık}
            onChange={setYeniBaşlık}
            onEnterKey={yeniTodoEkle}
          />

          <NewTodoAddButton onTodoAddButton={() => yeniTodoEkle()} />
        </div>

        <div className="mt-4">

          <div className=" w-4/5 m-auto rounded-xl">

            {liste.map((item) => (
              <div className="grid md:flex md:py-2 md:flex-row gap-4 items-center border-b-4 border-gray-500">

                <div className="text-center text-white mt-2 md:mt-0 md:ml-4 md:w-8">
                  #{item.id}
                </div>

                {editingItemIds.includes(item.id) ? (
                  <div className="flex justify-between items-center m-auto w-2/3 md:w-3/5">

                    <input
                      className="border px-2 py-3 rounded bg-blue-400 outline-none border-blue-400 text-white placeholder:text-white  w-2/3"
                      value={editedTitles[item.id] || ""}
                      placeholder="Todo Düzenle..."
                      onChange={(e) =>
                        setEditedTitles((previousTitle) => ({
                          ...previousTitle,
                          [item.id]: e.target.value,
                        }))
                      }
                    />

                    <div className="space-x-3">

                      <button
                        className="border bg-green-500 border-green-500 text-white px-4 py-3 rounded"
                        onClick={() => saveEditedTitle(item.id)}
                        style={{ fontSize: "20px" }}
                      >
                        <LuSave />
                      </button>

                      <button
                        className="border bg-red-500 border-red-500 text-white px-4 py-3 rounded"
                        onClick={() => cancelEditing(item.id)}
                        style={{ fontSize: "20px" }}
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </div>
                ) : (

                  <NewTodoList
                    key={item.id}
                    item={item}
                    newTodoAdded={newTodoAppIsDone}
                    startEditing={startEditing}
                  />

                )}

                <div className="m-auto md:mr-auto">
                  <TodoDate
                    creationDate={item.oluşturmaTarihi}
                    editedDate={item.düzenlemeTarihi}
                  />
                </div>

              </div>

            ))}
          </div>
        </div>

      <div className="flex justify-center mt-4 mb-4">
        {clearButton && <ClearCompleteButton onClearCompleted={clearIsDone} />}
      </div>

      </div>

    </div>
  );
}
