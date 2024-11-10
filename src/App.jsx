import { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);

  // Menambahkan tugas baru
  const addTask = () => {
    const newTask = inputRef.current.value.trim();
    if (newTask) {
      const updatedTask = [...tasks, newTask];
      setTasks(updatedTask);
      localStorage.setItem("tasks", JSON.stringify(updatedTask));
      inputRef.current.value = "";
    } else {
      alert("Input tidak boleh kosong");
    }
  };

  // Menghapus tugas
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Memulai mode edit untuk tugas tertentu
  const handleEdit = (task, index) => {
    setEditingIndex(index); // Menyimpan indeks tugas yang sedang diedit
    setEditValue(task); // Menyimpan teks tugas yang sedang diedit
  };

  // Menyimpan perubahan tugas yang sedang diedit
  const saveEdit = (index) => {
    if (editValue.trim() === "") {
      alert("Tugas tidak boleh kosong");
      return;
    }

    const updatedTasks = tasks.map((task, i) =>
      i === index ? editValue : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingIndex(null);
    setEditValue("");
  };

  // Menangani penekanan tombol Enter
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      saveEdit(index);
    }
  };

  // Memuat tugas dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTask);
    inputRef.current.focus();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xs bg-white p-4 rounded-md shadow-md">
        <FcTodoList className='text-4xl absolute right-15' />
        <h1 className='text-3xl font-bold text-center mb-2'>TO DO LIST</h1>
        <div className='flex gap-4 mb-3'>
          <input
            type="text"
            className='px-2 py-2 border border-black rounded-md w-full placeholder:opacity-50'
            placeholder='Isi Kegiatanmu...'
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            ref={inputRef}
          />
          <button
            type='button'
            className='border px-2 py-2 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-600'
            onClick={addTask}
          >
            Simpan
          </button>
        </div>

        <ul>
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center mb-3">
              {editingIndex === i ? (
                // Jika sedang dalam mode edit, tampilkan input
                <input
                  type="text"
                  className='border px-2 py-1 rounded-md w-full'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  autoFocus
                />
              ) : (
                // Tampilkan teks jika tidak dalam mode edit
                <>
                  <li className='font-medium w-full'>{i + 1}. {task}</li>
                  <MdDelete
                    className='font-medium text-red-500 text-3xl cursor-pointer hover:-translate-y-1 transition'
                    onClick={() => handleDelete(i)}
                  />
                </>

              )}
              <div className="flex items-center gap-4 ml-2">
                {editingIndex === i ? (
                  <button
                    className='border font-bold rounded-md bg-yellow-400 text-black px-5 py-1 hover:bg-yellow-500'
                    onClick={() => saveEdit(i)}
                  >
                    Edit
                  </button>
                ) : (
                  <FaEdit
                    className='font-medium text-2xl cursor-pointer hover:-translate-y-1 transition'
                    onClick={() => handleEdit(task, i)}
                  />
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
