import { useQuery } from "@tanstack/react-query";
import Table from "./Table";
import { fetchTodo } from "../services/api";
import AddButton from "./AddButton";

const TodoComponent: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo", 9],
    queryFn: fetchTodo,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  if (data) {
    return (
      <div>
        <AddButton />
        <Table data={data || []} />
      </div>
    );
  }
};

export default TodoComponent;
