export const labelContainsDate = (label: string): boolean => {
  const lowercasedLabel = label.toLowerCase();
  return (
    lowercasedLabel.includes("date") ||
    lowercasedLabel.includes("created at") ||
    lowercasedLabel.includes("updated at")
  );
};
