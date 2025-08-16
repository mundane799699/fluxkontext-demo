import Image from "next/image";

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  prompt: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  aspectRatio?: string;
  showPrompt?: boolean;
  textAlign?: "text-left" | "text-center" | "text-right";
  gridCols?: string;
  objectFit?:
    | "object-contain"
    | "object-cover"
    | "object-fill"
    | "object-none"
    | "object-scale-down";
}

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  prompt,
  beforeAlt = "Before image enhancement",
  afterAlt = "After image enhancement",
  className = "",
  aspectRatio = "aspect-[1080/650]",
  showPrompt = true,
  textAlign = "text-center",
  gridCols = "md:grid-cols-2",
  objectFit = "object-cover",
}: BeforeAfterComparisonProps) {
  return (
    <div
      className={`relative bg-gradient-to-br border border-gray-400 rounded-2xl p-4 lg:p-6 max-w-6xl mx-auto ${className}`}
    >
      <div className={`grid ${gridCols} gap-8 md:gap-12`}>
        {/* Before Image */}
        <div className="space-y-4">
          <div className={textAlign}>
            <span className="inline-block  text-sm font-medium px-4 py-2 rounded-full">
              BEFORE
            </span>
          </div>
          <div className={`relative w-full ${aspectRatio}`}>
            <Image
              src={beforeImage}
              alt={beforeAlt}
              className={`${objectFit} rounded-md shadow-md`}
              fill
            />
          </div>
        </div>

        {/* After Image */}
        <div className="space-y-4">
          <div className={textAlign}>
            <span className="inline-block text-sm font-medium px-4 py-2 rounded-full">
              AFTER
            </span>
          </div>
          <div className={`relative w-full ${aspectRatio}`}>
            <Image
              src={afterImage}
              alt={afterAlt}
              className={`${objectFit} rounded-md shadow-md`}
              fill
            />
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      <div className={`mt-8 lg:mt-12 ${textAlign}`}>
        {showPrompt && (
          <h3 className="text-sm font-semibold tracking-wider mb-2">PROMPT</h3>
        )}
        <div className="backdrop-blur-sm bg-white/10 border border-gray-300/30 rounded-2xl p-2 lg:p-4">
          <p className="lg:text-lg leading-relaxed text-muted-foreground text-sm">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
