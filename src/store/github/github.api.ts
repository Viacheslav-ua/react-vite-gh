import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
    reducerPath: 'github/api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),

    endpoints: build => ({
        searchUser: build.query<unknown, string>({
            // query: () => 'search/users'
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                }
            })
        })
    })
})

export const { useSearchUserQuery } = githubApi