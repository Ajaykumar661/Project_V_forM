"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { questions } from "@/data/questions"
import PixelButton from "@/components/PixelButton"
import HeartPop from "@/components/HeartPop"
import BrainPop from "@/components/BrainPop"
import WrongAnswerPopup from "@/components/WrongAnswerPopup"
import { soundEffects } from "@/lib/soundEffects"
import { PixelHeart, PixelStar, PixelDiamond, PixelSparkle, PixelRose, PixelGift, PixelArrow } from "@/components/PixelAssets"
import HangingHearts from "@/components/HangingHearts"

export default function Home() {
  const [index, setIndex] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [showBrain, setShowBrain] = useState(false)
  const [showWrongPopup, setShowWrongPopup] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [showMeme, setShowMeme] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

  const heartTimeoutRef = useRef<number | null>(null)
  const brainTimeoutRef = useRef<number | null>(null)
  const nextTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setIsClient(true)
    // Initialize sound effects on client
    if (typeof window !== 'undefined') {
      soundEffects.init()
    }
  }, [])

  useEffect(() => {
    if (showMeme) {
      const memeTimeoutRef = window.setTimeout(() => {
        setShowMeme(false)
        setHasStarted(true)
      }, 5000)
      return () => clearTimeout(memeTimeoutRef)
    }
  }, [showMeme])

  const current = questions[index]
  const progress = Math.round(((index + 1) / questions.length) * 100)

  const handleAnswer = (i: number) => {
    if (answered) return

    setAnswered(true)
    
    // Play woosh sound when answer is selected
    soundEffects.playWoosh()

    if (heartTimeoutRef.current) {
      clearTimeout(heartTimeoutRef.current)
      heartTimeoutRef.current = null
    }
    if (brainTimeoutRef.current) {
      clearTimeout(brainTimeoutRef.current)
      brainTimeoutRef.current = null
    }
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current)
      nextTimeoutRef.current = null
    }

    const isCorrect = i === current.correctIndex
    if (isCorrect) {
      setShowHeart(true)
      setScore(score + 1)
      // Play correct sound after woosh
      heartTimeoutRef.current = window.setTimeout(() => {
        soundEffects.playCorrect()
      }, 100)
      heartTimeoutRef.current = window.setTimeout(() => {
        setShowHeart(false)
        heartTimeoutRef.current = null
      }, 800)
    } else {
      setShowBrain(true)
      setShowWrongPopup(true)
      // Play wrong sound after woosh
      brainTimeoutRef.current = window.setTimeout(() => {
        soundEffects.playWrong()
      }, 100)
      brainTimeoutRef.current = window.setTimeout(() => {
        setShowBrain(false)
        brainTimeoutRef.current = null
      }, 800)
    }

    nextTimeoutRef.current = window.setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1)
        setAnswered(false)
      } else {
        setIsComplete(true)
      }
      nextTimeoutRef.current = null
    }, 1000)
  }

  const handleWrongPopupClose = () => {
    setShowWrongPopup(false)
  }

  const handleRestart = () => {
    setIndex(0)
    setScore(0)
    setAnswered(false)
    setIsComplete(false)
    setHasStarted(false)
  }

  const handleValentineYes = () => {
    soundEffects.playCorrect()
    setShowConfirmPopup(true)
  }

  const handleConfirmPopupClose = () => {
    setShowMeme(true)
    soundEffects.playCorrect()
  }

  const handleStartQuiz = () => {
    setShowMeme(false)
    setHasStarted(true)
    soundEffects.playClick()
  }

  const handleValentineNo = () => {
    // Make the No button run away from the cursor
    const randomX = Math.random() * 200 - 100
    const randomY = Math.random() * 200 - 100
    setNoButtonPosition({ x: randomX, y: randomY })
    soundEffects.playWrong()
  }
  useEffect(() => {
    return () => {
      if (heartTimeoutRef.current) clearTimeout(heartTimeoutRef.current)
      if (brainTimeoutRef.current) clearTimeout(brainTimeoutRef.current)
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current)
    }
  }, [])

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      >
        {/* Hanging hearts background */}
        {isClient && <HangingHearts count={10} />}

        {/* Animated background hearts */}
        {isClient && Array(10).fill(0).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
              opacity: 0
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
            className="absolute pointer-events-none"
          >
            <PixelHeart size={32} className="text-red-500" />
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="mb-8 text-8xl z-10"
        >
          💑
        </motion.div>

        {/* Results Card */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8 text-center z-10 p-8 bg-gradient-to-br from-pixelPink via-pixelLight to-pixelPink border-4 border-white shadow-[12px_12px_0_0_rgba(0,0,0,0.5)] max-w-md mx-auto"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Corner decorations */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}>
            <PixelDiamond size={24} />
          </div>
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px'
          }}>
            <PixelGift size={24} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px'
          }}>
            <PixelRose size={24} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px'
          }}>
            <PixelSparkle size={24} />
          </div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-pixel text-xl mb-8 text-black"
            style={{ textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)' }}
          >
            Thanks for taking the quiz!
          </motion.h1>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-6xl mb-8"
          >
            ❤️
          </motion.div>

          {/* Placeholder for dynamic content based on correct answers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-pixel text-xs text-black font-bold mb-8 p-4 bg-white bg-opacity-50 border-2 border-black"
          >
            [Placeholder: Dynamic content based on answers]
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center relative pb-20 overflow-hidden">
      <AnimatePresence>{showHeart && <HeartPop />}</AnimatePresence>
      <AnimatePresence>{showBrain && <BrainPop />}</AnimatePresence>
      <AnimatePresence>{showWrongPopup && <WrongAnswerPopup onClose={handleWrongPopupClose} />}</AnimatePresence>

      {/* Valentine's Proposal Screen */}
      <AnimatePresence>
        {!hasStarted && !showConfirmPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[9999] pointer-events-auto"
            style={{
              background: 'linear-gradient(to bottom, #ffe5ec 0%, #fff5f7 50%, #ffe5ec 100%)'
            }}
          >
            {isClient && <HangingHearts count={12} />}

            <motion.div
              initial={{ scale: 0, rotateZ: -180 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="mb-8 text-9xl relative z-10"
            >
              💕
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center max-w-md mx-auto p-8 bg-gradient-to-br from-pixelPink via-pixelLight to-pixelPink border-4 border-white shadow-[16px_16px_0_0_rgba(0,0,0,0.5)] relative"
            style={{ position: 'relative', overflow: 'visible' }}
          >
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <PixelSparkle size={24} />
            </div>
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
              <PixelHeart size={24} />
            </div>
            <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
              <PixelRose size={24} />
            </div>
            <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
              <PixelDiamond size={24} />
            </div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-pixel text-2xl mb-6 text-black"
              style={{ textShadow: '3px 3px 0px rgba(255, 255, 255, 0.7)' }}
            >
              Will You Be My Valentine?
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-pixel text-sm mb-12 text-black"
              style={{ textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)' }}
            >
            </motion.p>

            {/* Yes and No Buttons Container */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%',
                position: 'relative'
              }}
            >
              {/* Yes Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleValentineYes}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
                  border: '4px solid #000',
                  borderRadius: '0px',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#000',
                  cursor: 'pointer',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.5)',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
                onHoverStart={() => {
                  soundEffects.playClick()
                }}
              >
                YES 💕
              </motion.button>

              {/* No Button - Runs away */}
              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onMouseEnter={handleValentineNo}
                onTouchStart={handleValentineNo}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
                  border: '4px solid #000',
                  borderRadius: '0px',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#000',
                  cursor: 'not-allowed',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  position: 'relative'
                }}
              >
                NO ❌
              </motion.button>
            </div>

            {/* Encouraging text */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-pixel text-xs mt-8 text-black"
              style={{ textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)' }}
            >
              ( No amuki paaru, nee dhan dhairiyamana aal aache! )
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmPopup && !showMeme && !hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[10000] pointer-events-auto"
            style={{
              background: 'linear-gradient(to bottom, #ffe5ec 0%, #fff5f7 50%, #ffe5ec 100%)'
            }}
            onClick={handleConfirmPopupClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center max-w-md mx-auto p-12 bg-gradient-to-br from-pixelPink via-pixelLight to-pixelPink border-4 border-white shadow-[16px_16px_0_0_rgba(0,0,0,0.5)] relative"
              style={{ position: 'relative', overflow: 'visible' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner decorations */}
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <PixelHeart size={24} />
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <PixelHeart size={24} />
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                <PixelHeart size={24} />
              </div>
              <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <PixelHeart size={24} />
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-8xl mb-8"
              >
                😏
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-pixel text-xl mb-8 text-black"
                style={{ textShadow: '3px 3px 0px rgba(255, 255, 255, 0.7)' }}
              >
                Yeah, That's What I Thought
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-pixel text-xs text-black mb-12"
                style={{ textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)' }}
              >
                A week ago you teased me, saying I don’t really know you.
                So I took that personally, Stay tuned!
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowConfirmPopup(false)
                  setHasStarted(true)
                  soundEffects.playCorrect()
                }}
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
                  border: '4px solid #000',
                  borderRadius: '0px',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#000',
                  cursor: 'pointer',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Let's Go! 💕
              </motion.button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating decoration hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: hasStarted ? 1 : 0, pointerEvents: 'none' }}>
        {isClient && Array(6).fill(0).map((_, i) => (
          <motion.div
            key={`deco-${i}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
            className="absolute text-3xl"
            style={{ left: `${(i + 1) * 15}%` }}
          >
            {i % 2 === 0 ? '💕' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* Meme Display Overlay */}
      <AnimatePresence>
        {showMeme && !hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[11000] pointer-events-auto"
            style={{
              background: 'linear-gradient(to bottom, #ffe5ec 0%, #fff5f7 50%, #ffe5ec 100%)'
            }}
            onClick={handleStartQuiz}
          >
            {isClient && <HangingHearts count={15} />}
            
            <div className="flex items-center justify-center w-full gap-8 cursor-pointer">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 flex-shrink-0"
                style={{ width: '40%', maxWidth: '500px' }}
              >
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center z-10 flex-1"
              >
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-pixel text-4xl text-black text-center mb-6"
                  style={{ textShadow: '3px 3px 0px rgba(255, 255, 255, 0.7)' }}
                >
                  STAY TUNED! 
                </motion.p>
                
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-6xl"
                >
                  ⏰💕
                </motion.div>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-pixel text-xs text-black text-center mt-8"
                  style={{ textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)' }}
                >
                  (Click to continue)
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: hasStarted ? 1 : 0, pointerEvents: 'none' }}>
        {isClient && Array(8).fill(0).map((_, i) => {
          const pixelAssets = [PixelSparkle, PixelStar, PixelDiamond, PixelHeart, PixelRose, PixelGift];
          const RandomAsset = pixelAssets[Math.floor(Math.random() * pixelAssets.length)];
          return (
            <motion.div
              key={`pixel-icon-${i}`}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -100,
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 0.8],
                rotate: 360
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: '-50px'
              }}
            >
              <RandomAsset size={28} />
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar with decorative border */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted ? 1 : 0 }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '300px',
          zIndex: 50,
          pointerEvents: hasStarted ? 'auto' : 'none'
        }}
      >
        <div style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '10px',
          marginBottom: '8px',
          color: '#000',
          textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          {index + 1} / {questions.length}
        </div>
        <div style={{
          position: 'relative',
          padding: '4px',
          background: '#000',
          border: '3px solid #000',
          boxShadow: '4px 4px 0 rgba(0,0,0,0.7)'
        }}>
          <div style={{
            height: '16px',
            background: '#ffc0cb',
            border: '2px solid #000',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #ff1493, #ffb6c1, #ffc0cb)'
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Main content - centered */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '0 16px',
        flex: 1,
        position: 'relative',
        zIndex: 10,
        opacity: hasStarted ? 1 : 0,
        pointerEvents: hasStarted ? 'auto' : 'none',
        transition: 'opacity 0.3s ease'
      }}>
        {/* Hanging hearts background */}
        {isClient && hasStarted && <HangingHearts count={8} />}
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Question Box */}
            <motion.div
              style={{
                marginBottom: '40px',
                padding: '24px 24px 24px 24px',
                background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 50%, #ffb6c1 100%)',
                border: '4px solid #000',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.7), inset 0 0 0 2px #000',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
              initial={{ scale: 0.9, rotateY: -10 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Corner decorations */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                opacity: 0.7
              }}>
                <PixelSparkle size={16} />
              </div>
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                opacity: 0.7
              }}>
                <PixelSparkle size={16} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                opacity: 0.7
              }}>
                <PixelStar size={16} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                opacity: 0.7
              }}>
                <PixelStar size={16} />
              </div>
              
              <h1 
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '16px',
                  color: '#000',
                  textAlign: 'center',
                  margin: 0,
                  textShadow: '2px 2px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                {current.question}
              </h1>
            </motion.div>

            {/* Options Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px',
              width: '100%',
              position: 'relative'
            }}>
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                left: '-30px',
                top: '10px',
                opacity: 0.5
              }}>
                <PixelArrow size={20} />
              </div>
              <div style={{
                position: 'absolute',
                right: '-30px',
                top: '20px',
                opacity: 0.5
              }}>
                <PixelArrow size={20} />
              </div>
              
              {current.options.map((opt, i) => (
                <PixelButton 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                >
                  {opt}
                </PixelButton>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}