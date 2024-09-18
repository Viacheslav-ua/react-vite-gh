import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, ServerResponse } from "../../models/models";

export const githubApi = createApi({
    reducerPath: 'github/api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),

    endpoints: build => ({
        searchUser: build.query<IUser[], string>({
            // query: () => 'search/users'
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 5,
                },
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        })
    })
})

export const { useSearchUserQuery } = githubApi