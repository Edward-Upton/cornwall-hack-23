import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import CursorBlinker from "./cursor-blinker";
import { useEffect } from "react";

export default function TextAnim({
  text,
  duration,
}: {
  text: string;
  duration: number;
}) {
  const baseText = text;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest),
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: duration,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [baseText.length, count, duration]);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
