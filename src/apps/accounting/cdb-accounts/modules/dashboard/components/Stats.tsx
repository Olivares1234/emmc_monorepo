import { NumberCard } from "common/components/cards";

function Stats() {
  return (
    <div className="grid grid-cols-4 gap-6 mt-4">
      <NumberCard
        title="Sundry Total"
        value={4}
        paperProps={{
          bg: "indigo",
          className: "text-white",
        }}
      />
      <NumberCard
        title="Checks Total"
        value={25}
        paperProps={{
          bg: "grape",
          className: "text-white",
        }}
      />
    </div>
  );
}

export default Stats;
