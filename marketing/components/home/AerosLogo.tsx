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
        href={
          compact
            ? "/static/landing/logos/aeros/aeros-symbol.svg"
            : "/static/landing/logos/aeros/aeros-wordmark.svg"
        }
        width={compact ? 100 : 400}
        height={100}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
