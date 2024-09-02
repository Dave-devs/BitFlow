import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
interface FetchResult<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
}

const useFetch = <T>(
    url: string,
    config?: AxiosRequestConfig
): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, config);
                setData(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url, config]);

    return { data, error, isLoading };
};

export default useFetch;
