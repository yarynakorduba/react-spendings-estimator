import React, {Fragment} from "react";
import Calendar from "./Calendar";
import AddOutlayForm from "./AddOutlayForm";
import { base } from "../firebase";
import {filter, isEmpty, pipe, keys, map, values, reduceBy, add, groupBy} from "ramda";
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
      var amountsForPeriods = new Array();
      pipe (
          map(
              pipe(
                  map(map((date) => (amountsForPeriods[keys(sumByDate(date))[0]] =
                      values(sumByDate(date))[0],sumByDate(date)))),
                  map(month => (amountsForPeriods[keys(sumByMonth(values(month)))[0]] =
                      values(sumByMonth(values(month)))[0], sumByMonth(values(month))))
              )),
          map(year => (amountsForPeriods[keys(sumByYear(values(year)))[0]] =
              values(sumByYear(values(year)))[0], sumByYear(values(year)))),
          (total => (amountsForPeriods["total"] = values(sumTotal(values(total)))[0])),
          keys
      )(groupByDates(this.state.sorted_list));
      return amountsForPeriods;
  };


  addOutlay = item => {
    this.setState({sorted_list: [item, ...this.state.sorted_list]})
  };

  deleteOutlay = id => {
    this.setState({sorted_list: filter(i => i.id !== id, this.state.sorted_list)})
  };

  render() {
    const { sorted_list } = this.state;
    var amountsForPeriods = this.reduceByDates();
    return (
      <Fragment>
        <AddOutlayForm addOutlay={this.addOutlay} />
        <Calendar cost_list={isEmpty(sorted_list) ? sorted_list : groupByDates(sorted_list)}
                  deleteOutlay={this.deleteOutlay}
        amountsForPeriods={!isEmpty(sorted_list) ? amountsForPeriods : null}/>
      </Fragment>
    )
  }
}

export default Layout
