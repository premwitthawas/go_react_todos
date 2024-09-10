import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ListPlusIcon, Loader2, PlusCircleIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
const ItemCreateButton = () => {
    const [body, setBody] = useState("");
    const queryClient = useQueryClient();
    const { mutate: createTodo, isPending: isCreating } = useMutation({
        mutationKey: ["createTodo"],
        mutationFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/todos`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ body })
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Somthing went worng")
                }
                setBody("");
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    });
    return (
        <Sheet modal={false}>
            <SheetTrigger asChild>
                <Button><PlusCircleIcon className='w-5 h-5 mr-2' /> CreateTodo</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center justify-center gap-x-2">Create Todo Item <ListPlusIcon className="w-5 h-5" /></SheetTitle>
                    <SheetDescription />
                    <Separator />
                </SheetHeader>
                <div className="flex gap-2 flex-col mt-5">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="body">Body</Label>
                        <Textarea onChange={(e) => {
                            e.preventDefault();
                            setBody(e.target.value);
                        }} placeholder="Type your body here." id="body" />
                    </div>
                    <Button disabled={isCreating} onClick={()=> createTodo()}>
                        {isCreating ? <span className="flex items-center">Please Wait <Loader2 className='w-5 h-5 ml-2 animate-spin' /></span> : <span className="flex items-center">Create <PlusCircleIcon className='w-5 h-5 ml-2' /></span>}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default ItemCreateButton