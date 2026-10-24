interface AerosLogoProps {
  className?: string;
  compact?: boolean;
}

export function AerosLogo({ className, compact = false }: AerosLogoProps) {
  return (
    <svg
      className={className}
      viewBox={compact ? "0 0 100 100" : "0 0 400 100"}
      role="img"
      aria-label="Aeros"
    >
      <image
        href="/static/aeros-logo.png"
        x="0"
        y="0"
        width="100"
        height="100"
      />
      {!compact && (
        <text
          x="112"
          y="75"
          fill="currentColor"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="87"
          fontWeight="600"
          letterSpacing="-5"
        >
          aeros
        </text>
      )}
    </svg>
  );
}
