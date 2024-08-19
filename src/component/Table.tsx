import { Todo } from "../types";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const Table = ({ data }: { data: Todo[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((todo: Todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.body}</td>
              <td>
                <EditButton todo={todo} />
              </td>
              <td>
                <DeleteButton id={todo.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
