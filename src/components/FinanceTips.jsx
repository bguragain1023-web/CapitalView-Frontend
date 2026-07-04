import { useEffect } from "react";
import { useState } from "react";

export const FinanceTips = () => {
  const financeTips = [
    {
      tip: "Prioritize consistency over chasing trends",
      quote:
        "The stock market is a device for transferring money from the impatient to the patient.",
      by: "Warren Buffett",
    },
    {
      tip: "Automate your savings before you spend",
      quote:
        "Do not save what is left after spending, but spend what is left after saving.",
      by: "Warren Buffett",
    },
    {
      tip: "Focus on buying your time back, not just material things",
      quote:
        "Using your money to buy time and options has a lifestyle benefit that few luxury goods can compete with.",
      by: "Morgan Housel",
    },
    {
      tip: "Understand what you are actually investing in",
      quote: "Never invest in a business you cannot understand.",
      by: "Warren Buffett",
    },
    {
      tip: "True wealth is what you don't see",
      quote:
        "Spend money on things you love, and cut costs mercilessly on things you don't care about.",
      by: "Ramit Sethi",
    },
  ];

  const [showQuote, setShowQuote] = useState(financeTips[0]);
  useEffect(() => {
    setInterval(() => {
      setShowQuote(financeTips[Math.floor(Math.random() * financeTips.length)]);
    }, 3000);
  }, []);

  const { tip, quote, by } = showQuote;

  return (
    <div className="d-flex  flex-column gap-3 finance-box-edit ">
      <div className="tip-focus">{tip}</div>
      <p className="quote-focus">
        {quote} -- {by}
      </p>
    </div>
  );
};
