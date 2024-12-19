import Section from "../../../components/ui/Section";

function BentoGrid() {
  return (
    <Section>
      <h2 className="mb-8 text-center text-3xl font-bold">What Do We Offer</h2>
      <div className="grid h-[40rem] grid-cols-3 grid-rows-1 gap-4 shadow-xl">
        {/* Left column: 2:1 split */}
        <div className="flex h-full flex-col gap-4 p-0">
          <div className="flex grow items-center justify-center rounded-lg border border-primary-600 bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-800 shadow-xl">
            Large Item
          </div>
          <div className="flex h-48 items-center justify-center rounded-lg border border-primary-600 bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-800 shadow-xl">
            Small Item
          </div>
        </div>

        {/* Center column: Full height */}
        <div className="flex grow items-center justify-center rounded-lg border border-primary-600 bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-800 shadow-xl">
          Main Content
        </div>

        {/* Right column: 1:2 split */}
        <div className="flex h-full flex-col gap-4 p-0">
          <div className="flex grow items-center justify-center rounded-lg border border-primary-600 bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-800 shadow-xl">
            Small Item
          </div>
          <div className="flex grow items-center justify-center rounded-lg border border-primary-600 bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-800 shadow-xl">
            Large Item
          </div>
        </div>
      </div>
    </Section>
  );
}

export default BentoGrid;
