'use client';
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    const [toggle, setToggle] = useState(false);
    const [falseToggle, setFalseToggle] = useState(false);

    // Always re-run the effect
    console.log('🔥 Rerender');
  
    // Just run once
    const obj = useMemo(() => {
        return { toggle: toggle };
    }, [toggle]);
  
    useEffect(() => {
      console.log('🔵 Effect');
    }, [obj]);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                This is /todos page
            </h1>
            <button
                onClick={() => setFalseToggle((t) => !t)}
            >
                Toggle
            </button>
        </div>
    )
}
  