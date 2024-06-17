import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const texts = [
    "This is the ConV App.",
    "Here, You can compress Image as per your requirement.",
    "You can crop Image if required.",
    "Also, You can convert files.",
    "Such as, PDF to WORD file, PDF to IMG, etc....",
    "File Compression is also available to use.",
    "This site is purely to deal with daily small tasks.",
    "Hope you will like it.",
    "You are always welcome here.",
    "Thanking You, Made with Love by BISHAL LAHA ❤️❤️"
];

export default function Redo({ delay }) {
    const textIndex = useMotionValue(0);
    const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        baseText.get().slice(0, latest)
    );
    const updatedThisRound = useMotionValue(true);

    useEffect(() => {
        animate(count, 60, {
            type: "tween", delay: delay, duration: 1, ease: "easeIn", repeat: Infinity,
            repeatType: "reverse", repeatDelay: 1,
            onUpdate(latest) {
                if (updatedThisRound.get() === true && latest > 0) {
                    updatedThisRound.set(false);
                } else if (updatedThisRound.get() === false && latest === 0) {
                    if (textIndex.get() === texts.length - 1) {
                        textIndex.set(0);
                    } else {
                        textIndex.set(textIndex.get() + 1);
                    }
                    updatedThisRound.set(true);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <motion.span className="inline py-0.5 px-1 font-semibold tracking-wider rounded-md ml-2 bg-orange-400 text-white leading-3 ">{displayText}</motion.span>;
}