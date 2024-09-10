import { useQuery } from "@tanstack/react-query"
import { Todo } from "./types/todos.type";
import ItemCard from "./components/todos/ItemCard";

function App() {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/todos")
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  if (isLoading) return <p>loading .... </p>
  if (!todos) return <h2 className="text-center py-5 text-2xl font-bold">No Lists Here .</h2>
  return (
    <main className="container m-auto py-5">
      <h1 className="font-bold tracking-tighter text-xl">List Todos :</h1>
      <div className="grid grid-cols-4 mt-5 gap-x-5">
        {
          todos && todos.map((todo) => {
            return <ItemCard todo={todo} />
          })
        }
      </div>
    </main>
  )
}

export default App
