import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type DeletedMealResponse = {
  __typename?: 'DeletedMealResponse';
  meal?: Maybe<Meal>;
  message: Scalars['String']['output'];
};

export type DeletedResponse = {
  __typename?: 'DeletedResponse';
  message: Scalars['String']['output'];
  restaurant?: Maybe<Restaurant>;
};

export type Meal = {
  __typename?: 'Meal';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  restaurant: Restaurant;
};

export type MealCreateInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  restaurantId: Scalars['ID']['input'];
};

export type MealsCreateWithoutRestaurantIdInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal: Meal;
  addRestaurant: Restaurant;
  deleteMeal: DeletedMealResponse;
  deleteRestaurant: DeletedResponse;
  updateMeal: Meal;
  updateRestaurant: Restaurant;
};


export type MutationAddMealArgs = {
  data: MealCreateInput;
};


export type MutationAddRestaurantArgs = {
  data: RestaurantInput;
};


export type MutationDeleteMealArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMealArgs = {
  data: UpdateMealInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateRestaurantArgs = {
  data: RestaurantUpdateInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  meal?: Maybe<Meal>;
  meals: Array<Meal>;
  restaurant?: Maybe<Restaurant>;
  restaurants: Array<Restaurant>;
};


export type QueryMealArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMealsArgs = {
  restaurantId: Scalars['ID']['input'];
};


export type QueryRestaurantArgs = {
  id: Scalars['ID']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String']['output'];
  bannerImg: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meals: Array<Meal>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type RestaurantInput = {
  address: Scalars['String']['input'];
  bannerImg: Scalars['String']['input'];
  meals?: InputMaybe<Array<MealsCreateWithoutRestaurantIdInput>>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type RestaurantUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  bannerImg?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMealInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  restaurantId?: InputMaybe<Scalars['ID']['input']>;
};

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants: Array<{ __typename?: 'Restaurant', id: string, name: string, address: string, phone: string, bannerImg: string, meals: Array<{ __typename?: 'Meal', id: string, name: string, price: number }> }> };


export const GetRestaurantsDocument = gql`
    query GetRestaurants {
  restaurants {
    id
    name
    address
    phone
    bannerImg
    meals {
      id
      name
      price
    }
  }
}
    `;

/**
 * __useGetRestaurantsQuery__
 *
 * To run a query within a React component, call `useGetRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
      }
export function useGetRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
        }
export function useGetRestaurantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
        }
export type GetRestaurantsQueryHookResult = ReturnType<typeof useGetRestaurantsQuery>;
export type GetRestaurantsLazyQueryHookResult = ReturnType<typeof useGetRestaurantsLazyQuery>;
export type GetRestaurantsSuspenseQueryHookResult = ReturnType<typeof useGetRestaurantsSuspenseQuery>;
export type GetRestaurantsQueryResult = Apollo.QueryResult<GetRestaurantsQuery, GetRestaurantsQueryVariables>;