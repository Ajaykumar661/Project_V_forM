import { motion } from "framer-motion"

export default function HeartPop() {
  const hearts = ['❤️', '💕', '💖', '💗']
  const randomHearts = Array(4).fill(0).map(() => hearts[Math.floor(Math.random() * hearts.length)])

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      {randomHearts.map((heart, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: (Math.random() - 0.5) * 150,
            y: -150,
            opacity: 0,
            scale: 0.5,
            rotate: 360
          }}
          transition={{ 
            duration: 1, 
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="absolute text-4xl"
        >
          {heart}
        </motion.div>
      ))}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.6 }}
        className="text-8xl"
      >
        ❤️
      </motion.div>
    </motion.div>
  )
}
