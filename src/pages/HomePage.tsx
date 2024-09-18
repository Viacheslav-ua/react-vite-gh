import { useSearchUserQuery } from "../store/github/github.api"

export function HomePage() {

    const { isError, data } = useSearchUserQuery('Viacheslav-ua')


    return (
        <>
        <div className="text-green-500">Home</div>
        
        </>
        
    )
}