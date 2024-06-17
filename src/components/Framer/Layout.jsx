import { DocumentTextIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { AnimText } from "../Index";
import { useMediaQuery } from "react-responsive";

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.3, ease: "easeOut", delayChildren: 0.3, staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export default function Layout() {
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    return (
        <motion.div className="flex w-full select-none items-center justify-center ">
            <motion.div variants={containerVariants} animate="visible" initial="hidden"
                className={`flex ${isMobileScreen ? "w-full" : "w-[80%] p-2"}  h-[400px] flex-col rounded-2xl bg-white `}
            >
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                    <DocumentTextIcon className="h-8 w-8 text-indigo-700" />
                    <span className={`text-slate-700 italic ${isMobileScreen ? "text-[0.7rem]" : "text-[1rem]"}`}><span className={`text-blue-500 font-bold not-italic ${isMobileScreen ? " text-[0.9rem]" : "text-[1.2rem]"}`}>ConV</span> - Your Own Converter, Compressor</span>
                </motion.div>
                <motion.span variants={itemVariants}
                    className={`inline h-full w-full ${isMobileScreen ? "pt-[20%] px-2 text-[0.8rem]" : "p-8 text-lg"}  text-slate-900`}
                >
                    <AnimText delay={1} />
                </motion.span>
            </motion.div>
        </motion.div>
    );
}