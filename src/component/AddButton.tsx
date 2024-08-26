import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { mutation } from "../services/api";
import { Todo } from "../types";
import Swal from "sweetalert2";

const AddButton = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: mutation,
    onSuccess: (newTodo: Todo) => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      Swal.fire({
        title: "Success!",
        text: "Todo item added successfully.",
        icon: "success",
        confirmButtonText: "Great",
      });
      if (isPending) return <div>Loading...</div>;
    },
  });

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const handleSubmit = (title: string, body: string) => {
    mutate({ title, body });
  };

  return (
    <>
      <div className="flex justify-end">
        <button className="btn btn-success" onClick={() => setOpen(true)}>
          +
        </button>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddButton;
