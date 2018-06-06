import React, {Component} from 'react';
import CostList from './CostListComponent';
import CostForm from './CostFormComponent';
import { Info, DateTime } from 'luxon';


let WEEK_DAYS = 7;

class CostApp extends React.Component {
    state = {total_costs: 0, cost_list: [], sorted_list:{}};
    addCosts = item => {
        let temp_list = this.state.sorted_list;
        let dt = item.date.split('-');
        item.date = DateTime.local(+dt[0],
            +dt[1], +dt[2]);
        console.log(item.date.year);

        console.log(temp_list, "!!!!!!!!!");
        if (!(temp_list["y"+item.date.year])) {
            console.log("No");
            temp_list["y" + item.date.year]={}
        }
        if (!(temp_list["y"+item.date.year]["m" + item.date.month])) {
            (temp_list["y" + item.date.year]["m"+item.date.month]) = {}
        }
        if  (!(temp_list["y"+item.date.year]["m" + item.date.month]
                ["d"+item.date.day])) {
            temp_list["y"+item.date.year]["m" + item.date.month]
                ["d"+item.date.day] = []
        }
        (temp_list["y"+item.date.year]["m"+item.date.month]["d"+item.date.day]).push(item);

            console.log("temp_list ", temp_list)

        for (let i in temp_list) {
                console.log("i : ", temp_list[i]);
        }

        this.setState({total_costs: this.state.total_costs + eval(item.cost),
            cost_list: [item, ...this.state.cost_list],
            sorted_list: temp_list
            });
    };

    deleteCosts = item => {
        console.log("delete cost", item.cost);
        this.setState({total_costs: this.state.total_costs-item.cost,
        cost_list: this.state.cost_list.filter(i => i.id !== item.id)});
    }


    render() {
        const {cost_list, total_costs} = this.state;

        return (
            <div><CostForm addCosts={this.addCosts.bind(this)}/>
            <CostList cost_list={cost_list}
                      deleteCosts={this.deleteCosts.bind(this)}
                      total_costs={total_costs}/></div>
        );
    }
}

export default CostApp;