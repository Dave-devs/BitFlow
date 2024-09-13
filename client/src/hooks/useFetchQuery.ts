import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

interface FetchResponse<T> {
  data: T | null; // Allow data to be null until it's loaded
  loading: boolean;
  error: Error | null;
  refetch: () => void;
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
    queryFn: () => fetchData<T>(url, config),
    enabled: !!url // Ensure the query does not run if the URL is empty or undefined
  });

  const { data, isLoading, error, refetch } = queryResult;

  return {
    data: data || null, // Ensure data is null if not yet loaded
    loading: isLoading,
    error: error || null,
    refetch
  };
};

export default useFetchQuery;