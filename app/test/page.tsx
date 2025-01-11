"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface Todo {
  id: number;
  name: string;
  complete: boolean;
}
const Page = () => {
  const [value, setValue] = useState<string>("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [done, setDone] = useState<boolean>(false);

  const inputvalue = () => {
    if (value.trim() === "") return;
    const newtodo = {
      id: Math.random(),
      name: value,
      complete: done,
    };
    setTodo([...todo, newtodo]);
    setValue("");
  };

  function deleteUname(id: number) {
    if (todo !== undefined) {
      setTodo(todo.filter((item) => item.id !== id));
    } else {
      alert("error");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-60 w-full">
      <div className="flex ">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={inputvalue}>Them todo</Button>
      </div>
      <div>
        {todo.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mt-8 ">
            <div className={`${done ? "line-through" : "no-underline"}`}>
              <span className="mr-2">
                id:{item.id} ----{">"}
              </span>
              {item.name}
            </div>
            <div>
              <Input
                type="checkbox"
                defaultChecked={item.complete}
                onChange={(e) => setDone(e.target.checked)}
              />
            </div>
            <div>
              <Button type="button" onClick={() => deleteUname(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
