import { LucideSquareStack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemCreateButton from '../todos/ItemCreateButton';

const links = [
    {
        url: "#",
        lable: 'Home'
    },
    {
        url: "#",
        lable: 'About'
    },
    {
        url: "#",
        lable: 'Contact'
    },
    {
        url: "#",
        lable: 'Todos'
    },
]

const Navbar = () => {
    return (
        <header className='w-full flex p-5 items-center justify-between backdrop-blur-sm shadow-md'>
            <div className='flex gap-2 font-semibold'>
                <LucideSquareStack className='w-5 h-5 ml-2' />
                <span className='underline underline-offset-4'>Todos</span>
            </div>
            <div className='flex items-center gap-x-2'>
                {
                    links.map((item) => {
                        return <Button variant={'link'} key={item.lable}>
                            {item.lable}
                        </Button>
                    })
                }
            </div>
            <div>
                <ItemCreateButton />
            </div>
        </header>
    )
}

export default Navbar