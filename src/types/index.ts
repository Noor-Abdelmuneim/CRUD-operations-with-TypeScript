export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
}

export interface newTodo { 
  title: string; 
  body: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (updatedTodo: Todo) => void;
}
export interface EditButtonProps {
  todo: Todo;
}
