// EditButton.tsx
import React, { useState } from 'react';
import { EditButtonProps, Todo } from '../types';
import EditModal from './EditModal';
import Swal from 'sweetalert2';


const EditButton: React.FC<EditButtonProps> = ({ todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedTodo: Todo) => {

    Swal.fire({
        title: 'Success!',
        text: 'Todo item updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={todo}
        onSave={handleSave}
      />
    </>
  );
};

export default EditButton;
