import { useCabins } from "../cabins/useCabins";

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays }) {
  const numBookings = bookings.length;
  const { cabins } = useCabins();

  const sales = bookings.reduce((accu, current) => {
    return accu + current.totalPrice;
  }, 0);

  const checkins = confirmedStays.length;

  const occupation = confirmedStays.reduce(
    (acc, current) => acc + current.numNights,
    0
  );

  const availableNights = Number(numDays) * cabins?.length;

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${((occupation * 100) / availableNights).toFixed(1)} %`}
      />
    </>
  );
}

export default Stats;
