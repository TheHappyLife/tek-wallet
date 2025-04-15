import { useRouter } from "next/navigation";
function useCustomRouter(): ReturnType<typeof useRouter> {
  const router = useRouter();
  const push = (path: string) => {
    //some logic (play sound, vibrate...)
    router.push(path);
  };

  return { ...router, push };
}

export default useCustomRouter;
