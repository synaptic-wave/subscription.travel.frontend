import { useEffect, useRef } from "react";

export default function useMountOnSecondRender(fn, dependecies) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    fn();
    ref.current = true;
  }, [...dependecies]);
}
