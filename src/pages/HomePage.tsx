import { useEffect, useState } from "react";
import { useSearchUserQuery } from "../store/github/github.api";

export function HomePage() {
    const [search, setSearch] = useState('');
    const { isError, data } = useSearchUserQuery('Viacheslav-u') ;

    useEffect(() =>{
        console.log(search);
    }, [search])

    
    


    return (
        <div className="flex pt-10 mx-2 h-screen w-screen">
        {
            isError && 
            <p className="text-center text-red-600">Something went wrong ...</p>
        }

            <div className="relative w-[560px]">
                <input 
                type="text" 
                className="border py-2 px-4 h-[42px] mb-2"
                placeholder="Search from Github username"
                value={search}
                onChange={e => setSearch(e.target.value) }
                />

                <div className="absolute top-[44px] left-0 ring-0 min-w-[200px] shadow-md bg-white">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt rerum consequuntur, deleniti, iure officiis ipsa labore, dolorum explicabo numquam corrupti est ducimus possimus asperiores nemo at. Eum quam commodi mollitia.
                </div>
            </div>

            
        </div>

        
    )
}