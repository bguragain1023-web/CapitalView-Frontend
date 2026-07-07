import { BsGraphDownArrow } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";

export const ExpensesSavings = () => {
  return (
    <div className="exp-sav-wrap">
      <div className="exp-sav-side exp-side">
        <span className="exp-word size-lg">
          expenses <BsGraphDownArrow />
        </span>
        <span className="exp-word size-md">
          expenses <BsGraphDownArrow />
        </span>
        <span className="exp-word size-sm">
          expensess <BsGraphDownArrow />
        </span>
        <div className="arrow-down" />
        <p className="caption">cut your expenses</p>
      </div>

      <div className="divider" />

      <div className="exp-sav-side sav-side">
        <span className="sav-word size-sm">
          savings <BsGraphUpArrow />
        </span>
        <span className="sav-word size-md">
          savings <BsGraphUpArrow />
        </span>
        <span className="sav-word size-lg">
          savings <BsGraphUpArrow />
        </span>
        <div className="arrow-up" />
        <p className="caption">grow your savings</p>
      </div>
    </div>
  );
};
