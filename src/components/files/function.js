import moment from "moment";
export default function dateTH(date) {
  let dateTH = moment.utc(date).format("DD-MM-YYYY").split("-");
  let time = moment.utc(date).format("HH-mm-ss").split("-");
  time[1] = parseInt(time[1]) + 2;
  //   if (time[0] <= 6) {
  //     dateTH[0] = dateTH[0] - 1;
  //     time[0] = parseInt(time[0]) + 17;
  //   } else {
  //     time[0] = parseInt(time[0]) - 7;
  //   }
  dateTH =
    dateTH[0] +
    "-" +
    dateTH[1] +
    "-" +
    dateTH[2] +
    " " +
    time[0] +
    ":" +
    time[1];
  return dateTH;
}
