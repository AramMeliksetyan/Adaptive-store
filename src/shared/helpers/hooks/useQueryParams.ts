import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { DynamicObject } from "./useFetchQuery";

const useQueryParams = () => {
  const [queries, setQueries] = useSearchParams();

  const getQueries: DynamicObject = useMemo(() => {
    const searchParams = new URLSearchParams(queries.toString());

    // Convert URLSearchParams to an object
    const paramsObject: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
    }
    return paramsObject;
  }, []);
  return [getQueries, setQueries];
};

export default useQueryParams;
