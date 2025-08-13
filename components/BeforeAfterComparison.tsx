import Image from "next/image";

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  prompt: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  prompt,
  beforeAlt = "Before image enhancement",
  afterAlt = "After image enhancement",
  className = "",
}: BeforeAfterComparisonProps) {
  return (
    <div
      className={`relative bg-gradient-to-br border border-gray-400 rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Before Image */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="inline-block  text-sm font-medium px-4 py-2 rounded-full">
              BEFORE
            </span>
          </div>
          <div className="relative">
            <Image
              src={beforeImage}
              alt={beforeAlt}
              className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
              width={500}
              height={400}
            />
          </div>
        </div>

        {/* After Image */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="inline-block text-sm font-medium px-4 py-2 rounded-full">
              AFTER
            </span>
          </div>
          <div className="relative">
            <Image
              src={afterImage}
              alt={afterAlt}
              className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      <div className="mt-8 lg:mt-12 text-center">
        <h3 className="text-sm font-semibold tracking-wider mb-2">PROMPT</h3>
        <div className="backdrop-blur-sm bg-white/10 border border-gray-300/30 rounded-2xl p-2 lg:p-4">
          <p className="lg:text-lg leading-relaxed text-muted-foreground text-sm">
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}
