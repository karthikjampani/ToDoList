"use client";
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const toggleCompletion = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = !copyTask[i].completed;
    setMainTask(copyTask);
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between my-2'>
          <div className='flex items-center w-1/2'>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompletion(i)}
              className='form-checkbox h-5 w-5 text-blue-600 mr-4'
            />
            <div>
              <h4 className={`text-2xl font-bold ${t.completed ? 'line-through text-gray-500' : ''}`}>{t.title}</h4>
              <p className={`text-gray-600 font-semibold ${t.completed ? 'line-through' : ''}`}>{t.desc}</p>
            </div>
          </div>
          <button onClick={() => { deleteHandler(i) }} className='bg-red-400 text-white rounded px-2 py-0.5 text-xl font-semibold m-5 hover:bg-red-500'> Delete </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className='bg-zinc-900 text-white p-5 text-5xl font-bold text-center'>Todo List !</h1>
      <form onSubmit={submitHandler}>
        <input type='text' className='text-2xl border border-black focus:border-zinc-800 border-3 m-5 px-4 py-2' placeholder="Enter your task !" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
        <input type='text' className='text-2xl border border-black border-zinc-800 border-3 m-5 px-4 py-2' placeholder="Enter Description" value={desc} onChange={(e) => {
          setDesc(e.target.value);
        }} />
        <button className='bg-zinc-800 text-white rounded px-4 py-2 text-2xl font-bold m-5'>Add Task</button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  );
};

export default Page;
