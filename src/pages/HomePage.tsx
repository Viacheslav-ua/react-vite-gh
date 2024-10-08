import { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchUserQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import { RepoCard } from "../components/RepoCard";

export function HomePage() {
  const [search, setSearch] = useState('Viacheslav-ua');
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search, 400);
  const { isError, isLoading, data: users } = useSearchUserQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isError: areReposError, isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users])


  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }


  return (
    <div className="flex pt-10 mx-2 h-screen w-screen">
      {
        isError || areReposError &&
        <p className="text-center text-red-600">Something went wrong ...</p>
      }

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 h-[42px] mb-2"
          placeholder="Search from Github username"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setDropdown(true)}
        />

        {dropdown &&
          <ul className="list-none absolute top-[44px] left-0 ring-0 min-w-[200px]
                 shadow-md bg-white overflow-y-scroll max-h-[300px]">
            {isLoading && <p className="text-center font-bold">Loading ...</p>}
            {users?.map(user => (
              <li key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white 
                         transition-colors cursor-pointer"
              >{user.login}</li>
            ))}
          </ul>}

        <div className="container">
          {areReposLoading &&
            <p className="text-center">Repos are loading ...</p>
          }
          {
            repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)
          }
        </div>


      </div>


    </div>


  )
}