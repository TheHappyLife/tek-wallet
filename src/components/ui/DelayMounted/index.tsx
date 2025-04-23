import { useEffect, useState } from "react";
import { GeneralProps } from "../../../types/ui";
interface DelayMountedPropsType extends GeneralProps {
  delay?: number;
}
function DelayMounted({ children, delay = 1000 }: DelayMountedPropsType) {
  const [allowMount, setAllowMount] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAllowMount(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{allowMount && children}</>;
}

export default DelayMounted;
