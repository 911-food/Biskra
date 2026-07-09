import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finish = () => {
      setVisible(false);
      setTimeout(onDone, 600);
    };

    video.addEventListener("ended", finish);

    const fallback = setTimeout(finish, 15000);

    return () => {
      video.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}loader.mp4`}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
