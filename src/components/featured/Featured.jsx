import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import "./featured.scss"

const Featured = ({data}) => {
  const percent = data.percent;
  const stringpercent = String(percent) + "%"
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Budget Spent</h1>
        <AddBusinessIcon fontSize = "small" />
      </div>
      <div className="buttom">
        <div className="featuredChart">
          <CircularProgressbar value={percent} text={stringpercent} strokeWidth={5}/>
        </div>
        <p className="title">Total Budget amount spent</p>
        <p className="amount">{`₦ ${data.remaining_amount}`}</p>
        <p className="desc">This year's budget</p>
        <p className="amountsmall">{`₦ ${data.total_budget}`}</p>
      </div>
    </div>
  )
}

export default Featured
