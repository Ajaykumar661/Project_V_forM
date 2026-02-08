import { motion } from "framer-motion"
import PixelButton from "./PixelButton"

export default function WrongAnswerPopup({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{
          background: 'linear-gradient(135deg, #ffb6c1, #ffc0cb)',
          border: '4px solid #000',
          padding: '32px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '12px 12px 0 rgba(0,0,0,0.7)'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-6xl mb-4"
        >
          🧠
        </motion.div>

        <h2
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '16px',
            color: '#000',
            margin: '0 0 16px 0',
            textShadow: '2px 2px 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          OOPS!
        </h2>

        <p
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '12px',
            color: '#000',
            margin: '0 0 24px 0',
            lineHeight: '1.4'
          }}
        >
          I guessed it wrong
        </p>

        <PixelButton onClick={onClose}>
          TRY NEXT
        </PixelButton>
      </motion.div>
    </motion.div>
  )
}
