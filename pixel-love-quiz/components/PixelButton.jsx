export default function PixelButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'linear-gradient(to bottom, #ffb6c1, #ffc0cb)',
        color: '#000',
        border: '4px solid #000',
        padding: '12px 24px',
        fontSize: '10px',
        fontFamily: '"Press Start 2P", cursive',
        fontWeight: 'bold',
        boxShadow: '6px 6px 0 rgba(0,0,0,0.7)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transform: 'translateY(0)',
        transition: 'all 75ms ease-in-out',
        width: '100%',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: '1.2'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.8)';
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.background = 'linear-gradient(to bottom, #ffc0cb, #ffb6c1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.7)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.background = 'linear-gradient(to bottom, #ffb6c1, #ffc0cb)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.target.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.7)';
          e.target.style.transform = 'translateY(2px) translateX(2px)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.target.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.7)';
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </button>
  )
}
