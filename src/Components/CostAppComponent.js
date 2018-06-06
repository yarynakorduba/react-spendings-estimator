import React, {Component} from 'react';
import CostList from './CostListComponent';
import CostForm from './CostFormComponent';

class CostApp extends React.Component {
    state = {total_costs: 0, cost_list: []};

    addCosts = item => {
        console.log("cost here", item.cost);
        this.setState({total_costs: this.state.total_costs + eval(item.cost),
            cost_list: [item, ...this.state.cost_list],
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
                      deleteCosts={this.deleteCosts.bind(this)}/></div>
        );
    }
}

export default CostApp;