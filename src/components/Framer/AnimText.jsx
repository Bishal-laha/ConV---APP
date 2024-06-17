import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Redo, Cursor } from "../Index";
import { useMediaQuery } from "react-responsive";

export default function AnimText({ delay }) {
    const [done, setDone] = useState(false);
    const baseText = "Hello Users, ";
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        baseText.slice(0, latest)
    );
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    useEffect(() => {
        const controls = animate(count, baseText.length, {
            type: "tween", delay: delay, duration: 1, ease: "easeInOut",
            onComplete: () => setDone(true)
        });
        return controls.stop;
    }, []);

    return (
        <span>
            <motion.span className={`p-2 bg-clip-text bg-transparent text-gray-500 rounded-lg font-semibold ${isMobileScreen ? " text-2xl" : "text-2xl"}`}>{displayText}</motion.span>
            {done && (
                <>
                    <br /> <br />
                </>
            )}
            <Redo delay={delay + 1} />
            <Cursor />
        </span>
    );
}