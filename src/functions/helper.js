const date = () => {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
const toBanglaNumber = (number) =>
  String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

const rateValue = (today,yesterday) =>
  Math.abs(((today - yesterday) / yesterday) * 100).toFixed(1);

export { date, toBanglaNumber, rateValue };
