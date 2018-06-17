import React from "react";
import Calendar from "./Calendar";
import AddOutlayForm from "./AddOutlayForm";
import { parse, getYear, getMonth, getDate } from 'date-fns';
import { base } from "../firebase";
import {compose, filter, groupBy, prop, keys, map, path} from "ramda";
import {v1} from "react-native-uuid";

class Layout extends React.Component {
  state = { total_costs: 0, sorted_list: [] };

    grouping() {
        return groupBy(function (item) {
            return getMonth(parse(item.date)) < 2 ? "A" : "B";
        });
    }


  componentDidMount() {
    this.cost_listRef = base.syncState("sorted_list", {
      context: this,
      state: "sorted_list"
    });
    this.cost_listRef1 = base.syncState("total_costs", {
      context: this,
      state: "total_costs"
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.cost_listRef);
    base.removeBinding(this.cost_listRef1);
  }

  addCosts = item => {
    let temp_list;
    if (this.state.sorted_list !== null && this.state.sorted_list != undefined && this.state.sorted_list !== "Null") {
      temp_list = this.state.sorted_list
    } else {
      temp_list = []
    }

      temp_list.push(item);
      this.setState({
      total_costs: +this.state.total_costs + eval(item.cost),
      sorted_list: temp_list
    })
  };

  deleteCosts = (id, cost) => {
    let temp_list = this.state.sorted_list;
    console.log();
    temp_list = filter(i => i.id !== id, temp_list);
      this.setState({total_costs: this.state.total_costs - cost,
      sorted_list: temp_list
    })
  };

  render() {
    const { total_costs, sorted_list } = this.state;
    return (
      <div>
        <AddOutlayForm addCosts={this.addCosts} />
        <Calendar cost_list={sorted_list} deleteCosts={this.deleteCosts} total_costs={total_costs} />
      </div>
    )
  }
}

export default Layout
