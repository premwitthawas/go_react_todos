import { Todo } from '@/types/todos.type'
import { Button } from '../ui/button'
import { Loader2, TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
    todo: Todo
}
const ItemDeleteButton = ({ todo }: Props) => {
    const queryClient = useQueryClient();
    const { mutate: deleteTodo, isPending: IsDeleting } = useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
                    method: 'DELETE'
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Somthing went worng")
                }
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
    return (
        <Button disabled={IsDeleting} size={'sm'} className=" bg-red-600" onClick={() => deleteTodo()}> {!IsDeleting ? <TrashIcon className="w-5 h-5" /> : <Loader2 className='animate-spin h-4 w-4' />} </Button>
    )
}

export default ItemDeleteButton