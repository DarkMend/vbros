import {
    InfiniteData,
    UseInfiniteQueryOptions,
    UseMutationOptions,
    UseQueryOptions,
  } from '@tanstack/react-query';
  import { AxiosError } from 'axios';
  
  export interface IPaginatedResponse<T> {
    items: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
  
  export interface IBasicResponse<T> {
    data: T;
    status: number;
  }
  
  export type IBasicResponseError = AxiosError<{ message?: string } | undefined>;
  
  export type IQueryOptions<T> = Omit<
    UseQueryOptions<T, IBasicResponseError>,
    'queryKey' | 'queryFn'
  >;
  export type IMutationOptions<T, D = void> = Omit<
    UseMutationOptions<T, IBasicResponseError, D>,
    'mutationKey' | 'mutationFn'
  >;
  export type IInfiniteQueryOptions<T, E = IBasicResponseError> = Omit<
    UseInfiniteQueryOptions<T, AxiosError<E>, InfiniteData<T>>,
    'queryKey' | 'queryFn' | 'getPreviousPageParam' | 'getNextPageParam' | 'initialPageParam'
  >;
