import SavingsIcon from '@mui/icons-material/Savings';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./featured.scss";

const Featured = ({ data }) => {
  const percent = data.percent;
  const stringpercent = String(percent) + "%";

  function addCommas(number) {
    // Convert the number to a string
    var numberString = String(number);
    
    // Split the number into integer and decimal parts (if any)
    var parts = numberString.split(".");
    
    // Get the integer part
    var integerPart = parts[0];
    
    // Add commas every three digits in the integer part
    var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Combine the formatted integer part with the decimal part (if any)
    var formattedNumber = parts.length > 1 ? formattedInteger + "." + parts[1] : formattedInteger;
    
    return formattedNumber;
  }

  const remaining_amout = addCommas(data.remaining_amount);
  console.log(remaining_amout)



  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Budget Spent</h1>
        <SavingsIcon fontSize="small" />
      </div>
      <div className="buttom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percent}
            text={stringpercent}
            strokeWidth={5}
          />
        </div>
        <p className="titleBar">Total Budget Spent in percent</p>
        <div className="belowBar">
          <div className="remaining">
          <p className="amount">{remaining_amout}</p>
          {/* <p className="amount">{`₦ ${data.remaining_amount}`}</p> */}
          <p className="title">Money remaining</p>
          </div>
          <p className="amountsmall">{`₦ ${addCommas(data.total_budget)}`}</p>
          <p className="desc">This year's budget</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
