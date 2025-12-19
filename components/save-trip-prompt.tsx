'use client';

interface SaveTripPromptProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function SaveTripPrompt({ onSave, onCancel }: SaveTripPromptProps) {
  return (
    <div className="flex justify-start mb-4 animate-fadeInUp">
      <div className="bg-white rounded-2xl px-5 py-4 rounded-bl-sm shadow-sm border border-[#e8e4dc]">
        <p className="text-[15px] text-[#2a2a2a] mb-4">
          Would you like to save this itinerary to &quot;My Trips&quot;?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-[#7c9885] text-white rounded-xl text-[14px] font-medium transition-all hover:bg-[#6a8573] hover:-translate-y-0.5 cursor-pointer"
          >
            Yes, save it
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 bg-white border border-[#e8e4dc] text-[#4a4a4a] rounded-xl text-[14px] font-medium transition-all hover:bg-[#faf8f4] cursor-pointer"
          >
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
}
