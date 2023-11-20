import { motion } from "framer-motion";
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from "../constants/animConstants";


const Home: React.FC = () => {

    const pageAnimVariants = {
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
    };

    return (
        <motion.div
            key="home"
            initial="beforeEnter"
            animate="visible"
            exit="exit"
            variants={pageAnimVariants}
            transition={{ duration: PAGE_TRANSITION_DURATION }}
            className="flex flex-col justify-center items-center m-32 font-karla"
        >
            <h1 className="text-4xl font-bold text-center mb-4">Home</h1>
            <h2 className="text-2xl font-bold text-center mb-4">Welcome to my website!</h2>

            <p className="text-center mb-4">
                This is a website I made to showcase my illustrations and games.
                I hope you enjoy your stay!
            </p>

            <p className="text-center mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                euismod libero, vitae aliquet odio lobortis id. Duis euismod
                consectetur justo, in pulvinar eros. Sed euismod euismod libero,
                vitae aliquet odio lobortis id. Duis euismod consectetur justo, in
                pulvinar eros.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                euismod libero, vitae aliquet odio lobortis id. Duis euismod
                consectetur justo, in pulvinar eros. Sed euismod euismod libero,
                vitae aliquet odio lobortis id. Duis euismod consectetur justo, in
                pulvinar eros.
            </p>
        </motion.div>
    );
}

export default Home;