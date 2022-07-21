import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [({setSelf, onSet}) => {
    const key = "todoList";
    const savedValue = localStorage.getItem(key);
    if(savedValue !== null){
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  }]
})