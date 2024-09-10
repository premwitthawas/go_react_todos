import { Button } from '../ui/button'
import { CheckIcon, Loader2 } from 'lucide-react'
import { Todo } from '@/types/todos.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
    todo: Todo
}

const ItemUpdateButton = ({ todo }: Props) => {
    const queryClient = useQueryClient();
    const { mutate: updateTodo, isPending: isUpdating } = useMutation({
        mutationKey: ['updateTodo'],
        mutationFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
                    method: 'PUT'
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Somthing went worng")
                }
                return data;
            }
            catch (err) {
                console.log(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });
    return !todo.completed ? <Button disabled={isUpdating} onClick={() => updateTodo()} size={'sm'} className="bg-green-600">{!isUpdating ?
        <CheckIcon className="w-5 h-5" />
        : <span><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</span>
    } </Button>
        : null
}

export default ItemUpdateButton