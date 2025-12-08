"use client";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Balloons } from "../home/Balloons";
import { usePathname } from "next/navigation";

export default function BalloonsBackground() {
  const pathname = usePathname();
  const [freeBalloons, setFreeBalloons] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Check if we're on a page where balloons should be freed
    if (pathname.startsWith("/cool-story")) {
      setFreeBalloons(true);
      setOpacity(0.3);
    }
  }, [pathname]);

  if (!pathname.startsWith("/home") && !pathname.startsWith("/cool-story")) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      <motion.div
        className={`${
          pathname.startsWith("/cool-story") ? "fixed" : "absolute"
        } inset-0 w-full h-full ${
          pathname.startsWith("/cool-story") ? "pointer-events-none" : ""
        } -z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{
          duration: pathname.startsWith("/cool-story") ? 2 : 4,
          ease: "easeOut",
          delay: pathname.startsWith("/cool-story") ? 0 : 2,
        }}
      >
        <Balloons freeBalloons={freeBalloons} />
      </motion.div>
    </Suspense>
  );
}
