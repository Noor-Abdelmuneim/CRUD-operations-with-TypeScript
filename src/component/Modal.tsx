import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const schema = z.object({
  title: z.string()
    .min(4, { message: "Title must be at least 4 characters long" }),
  body: z.string().min(1, { message: "Body is required" }),
});

type FormData = z.infer<typeof schema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.title, data.body);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Add New</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  id="title"
                  type="text"
                  {...field}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  placeholder="Type here"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-12">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  id="body"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-20"
                />
              )}
            />
            {errors.body && (
              <p className="text-red-600 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="btn btn-secondary mr-2 mt-10">Cancel</button>
            <button type="submit" className="btn btn-primary mt-10">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
