import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../services/api';
import Swal from 'sweetalert2';

const DeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", 9] });
      Swal.fire({
        title: 'Success!',
        text: 'Todo item deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
  });

  return (
    <button onClick={() => mutate()} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteButton;
