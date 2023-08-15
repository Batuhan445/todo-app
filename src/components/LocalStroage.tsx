interface todoListesi {
  id: number;
  başlık: any;
  isDone: boolean;
  oluşturmaTarihi: string;
  düzenlemeTarihi:string
}

export function saveListToLocalStorage(liste: todoListesi[]) {
  localStorage.setItem("todoList", JSON.stringify(liste));
}

export function loadListFromLocalStorage(): todoListesi[] | null {
  const storedList = localStorage.getItem("todoList");
  if (storedList) {
    return JSON.parse(storedList);
  }
  return null;
}