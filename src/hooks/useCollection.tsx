import * as constants from "../resources/constants.ts";
import { useMemo } from "react";
import { useLocation } from "react-router";

const useCollection = () => {
  const location = useLocation();
  const currLocation = location.pathname;

  const currType = useMemo(() => {
    return constants.LINKS_RESOURCES.find((link) => link.herf === currLocation);
  }, [currLocation]);

  return currType;
};

export default useCollection;
