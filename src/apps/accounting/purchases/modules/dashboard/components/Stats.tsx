import { NumberCard } from "common/components/cards";

function Stats() {
  return (
    <div className="grid grid-cols-4 gap-6 mt-4">
      <NumberCard
        title="Accounts"
        value={4}
        paperProps={{
          bg: "indigo",
          className: "text-white",
        }}
      />
      <NumberCard
        title="Purchases"
        value={25}
        paperProps={{
          bg: "grape",
          className: "text-white",
        }}
      />
      <NumberCard
        title="Supplier"
        value={1_432_982}
        paperProps={{
          bg: "cyan",
          className: "text-white",
        }}
      />
      <NumberCard
        title="Collections"
        value={876_453}
        paperProps={{
          bg: "yellow",
          className: "text-white",
        }}
      />
    </div>
  );
}

export default Stats;
