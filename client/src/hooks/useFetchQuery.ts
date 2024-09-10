import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

interface FetchResponse<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch?: () => void;
}

const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await axios.get<T>(url, config || {});
  return data;
};

const useFetchQuery = <T>(
  name: string,
  url: string,
  config?: AxiosRequestConfig
): FetchResponse<T> => {
  const queryResult: UseQueryResult<T, Error> = useQuery<T, Error>({
    queryKey: [name, url, config],
    queryFn: () => fetchData<T>(url, config)
  });

  const { data, isLoading, error, refetch } = queryResult;

  return {
    data: data as T,
    loading: isLoading,
    error: error ?? null,
    refetch
  };
};

export default useFetchQuery;
