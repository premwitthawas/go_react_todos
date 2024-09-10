import { Todo } from "@/types/todos.type"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import ItemUpdateButton from "./ItemUpdateButton"
import ItemDeleteButton from "./ItemDeleteButton"


interface Props {
    todo: Todo
}
const ItemCard = ({ todo }: Props) => {
    return (
        <div className="relative aspect-video flex items-center gap-2 flex-col justify-center bg-slate-200 w-full h-full rounded-md shadow-md" key={todo._id}>
            {todo.completed ? <Badge className="bg-green-600 flex items-center absolute top-2 right-2">Completed <CheckCircleIcon className="w-4 h-4 ml-2" /></Badge> : <Badge className="flex items-center absolute top-2 right-2" variant={'destructive'}>Not Completed <XCircleIcon className="w-4 h-4 ml-2" /></Badge>}
            <h1 className="text-2xl font-medium">{todo.body}</h1>
            <div className="absolute bottom-2 right-2 flex gap-1">
                <ItemUpdateButton todo={todo} />
                <ItemDeleteButton todo={todo} />
            </div>
        </div>
    )
}

export default ItemCard