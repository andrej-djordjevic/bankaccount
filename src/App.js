import { useReducer } from "react";
import "./styles.css";
 
const initialState = {
  balance: 0,
  loan: 0,
  hasLoan: false,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { ...state, balance: 500, loan: 0, isActive: true };

    case "deposit":
      return { ...state, balance: state.balance + 150 };

    case "withdraw":
      return { ...state, balance: state.balance - 50 };

    case "reqloan":
      if (state.hasLoan) return { ...state };
      else {
        return {
          ...state,
          balance: state.balance + 5000,
          loan: 5000,
          hasLoan: true,
        };
      }

    case "payloan":
      if (state.balance < 5000) return { ...state };
      else
        return {
          ...state,
          balance: state.balance - 5000,
          loan: 0,
          hasLoan: false,
        };

    case "close":
      if (state.balance === 0 && !state.hasLoan && state.loan === 0)
        return { ...state, isActive: false };
      else return { ...state };

    default:
      throw new Error("Unknown")
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: "open" })} disabled={false}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit" })}
          disabled={isActive ? false : true}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={isActive ? false : true}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "reqloan" })}
          disabled={isActive ? false : true}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payloan" })}
          disabled={isActive ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "close" })}
          disabled={isActive ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
