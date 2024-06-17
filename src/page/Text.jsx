import { Layout } from "../components/Index";
import { useMediaQuery } from "react-responsive";

function Text() {
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    return (
        <div className={` ${isMobileScreen ? "pt-[25%] mx-auto w-[90%]" : "h-[100vh] pt-[12%] w-full"} flex items-center justify-center`}>
            <Layout />
        </div>
    )
}

export default Text