export function Flower({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block aspect-[412/497] bg-current ${className ?? ""}`}
      style={{
        maskImage: "url(/flower.png)",
        WebkitMaskImage: "url(/flower.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
