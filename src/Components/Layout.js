import React from "react";
import Calendar from "./Calendar";
import AddOutlayForm from "./AddOutlayForm";
import { base } from "../firebase";
import {filter, isEmpty, defaultTo, pipe, keys, map, values, reduceBy, add, groupBy} from "ramda";
import {v1} from "react-native-uuid";
import {format, getDate, getMonth, getYear} from "date-fns";


var reduceByDateAttribute = reduceBy((acc, item) => add(acc,+item.amount), 0);
var reduceByDateValue = reduceBy((acc, item) => add(acc,+values(item)), 0);

var sumByDate = reduceByDateAttribute((item) => item.date);
var sumByMonth = reduceByDateValue((item) => format(keys(item), "YYYY-MM"));
var sumByYear = reduceByDateValue((item) => getYear(keys(item)));
var sumTotal = reduceByDateValue((item) => !isEmpty(item));

const groupByDates = pipe(
    groupBy(({date}) => getYear(date)),
    map(groupBy(({date}) => getMonth(date))),
    map(map(groupBy(({date}) => getDate(date))))
);


class Layout extends React.Component {
  state = { sorted_list: [] };

  componentDidMount() {

      this.cost_listRef = base.syncState("sorted_list", {
          context: this,
          state: "sorted_list"
      });
  }

  componentWillUnmount() {
    base.removeBinding(this.cost_listRef);
  }


  reduceByDates = () => {
      var temp1 = new Array();
      pipe(
          map(
              pipe(
                  map(map((el) => (temp1[keys(sumByDate(el))[0]] =
                      values(sumByDate(el))[0],sumByDate(el)))),
                  map(el1 => (temp1[keys(sumByMonth(values(el1)))[0]] =
                      values(sumByMonth(values(el1)))[0], sumByMonth(values(el1))))
              )),
          map(el => (temp1[keys(sumByYear(values(el)))[0]] =
              values(sumByYear(values(el)))[0], sumByYear(values(el)))),
          (el => (temp1["total"] = values(sumTotal(values(el)))[0])),
          keys
      )(groupByDates(this.state.sorted_list));
      return temp1;
  };


  addOutlay = item => {
    this.setState({
    sorted_list: [item, ...this.state.sorted_list]
    })
  };

  deleteOutlay = (id) => {
    let temp_list = filter(i => i.id !== id, this.state.sorted_list);
    this.setState({
    sorted_list: temp_list
    })
  };

  render() {
    const { sorted_list } = this.state;
    var amountsForPeriods = !isEmpty(sorted_list) ? this.reduceByDates() : null;
    return (
      <div>
        <AddOutlayForm addOutlay={this.addOutlay} />
        <Calendar cost_list={isEmpty(sorted_list) ? sorted_list : groupByDates(sorted_list)}
                  deleteOutlay={this.deleteOutlay}
        amountsForPeriods={!isEmpty(sorted_list) ? this.reduceByDates() : null}/>
      </div>
    )
  }
}

export default Layout
