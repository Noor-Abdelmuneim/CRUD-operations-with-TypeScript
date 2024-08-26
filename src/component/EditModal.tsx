import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalProps } from '../types';
import axiosInstance from '../library/axiosInstance';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const schema = z.object({
  title: z.string()
    .min(4, { message: "Title must be at least 4 characters long" }),
  body: z.string().min(1, { message: "Body is required" }),
});

type FormData = z.infer<typeof schema>;

const EditModal: React.FC<ModalProps & { todo?: { id: string, title: string, body: string } }> = ({ isOpen, onClose, todo, onSave }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: ''
    }
  });

  useEffect(() => {
    if (todo) {
      setValue('title', todo.title);
      setValue('body', todo.body);
    }
  }, [todo, setValue]);

  const onSubmit = async (data: FormData) => {
    if (todo) {
      const updatedTodo = { ...todo, ...data };
      await axiosInstance.put(`/posts/${todo.id}`, updatedTodo);
      onSave(updatedTodo);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  id="title"
                  type="text"
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700">Body</label>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  id="body"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-90"
                />
              )}
            />
            {errors.body && (
              <p className="text-red-600 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
