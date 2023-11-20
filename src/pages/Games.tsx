import { motion } from "framer-motion";
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from "../constants/animConstants";

const Games: React.FC = () => {
  return (
    <motion.div
      key="games"
      initial="beforeEnter"
      animate="visible"
      exit="exit"
      variants={{
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
      }}
      transition={{ duration: PAGE_TRANSITION_DURATION }}
    >
      <h1>Games</h1>
    </motion.div>
  );
}

export default Games;