import { motion } from "framer-motion";

export const LogoAnimation = () => (
    <>
        {/* <svg width="100" height="100">
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="black"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
            />
        </svg> */}
        <motion.div
            style={{
                width: "120px",
                height: "120px",
                backgroundColor: "white",
                marginRight: "auto",
                marginLeft: "auto",
                marginBottom: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "70px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                color: "blue",
                boxShadow: "8px 10px 6px rgba(0, 0, 0, 0.2)"
            }}
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
                duration: 1.5, // 애니메이션 지속 시간 (초)
            }}
        >
            B
        </motion.div>
    </>
);
