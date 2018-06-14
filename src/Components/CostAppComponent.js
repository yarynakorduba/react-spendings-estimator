import React from 'react';
import CostList from './CostListComponent';
import CostForm from './CostFormComponent';
import { Info, DateTime } from 'luxon';
import {base} from '../firebase';

class CostApp extends React.Component {
    state = {total_costs: 0, sorted_list:{}};

    componentDidMount() {
        this.cost_listRef = base.syncState('sorted_list', {
            context: this,
            state: 'sorted_list'
        });
        this.cost_listRef1 = base.syncState('total_costs', {
            context: this,
            state: 'total_costs',
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.cost_listRef);
        base.removeBinding(this.cost_listRef1);
    }

    addCosts = (item) => {
        let temp_list;
        if ((this.state.sorted_list !== null) && (this.state.sorted_list != undefined)
            && this.state.sorted_list !== 'Null') {
            temp_list = this.state.sorted_list;
        }else{temp_list={};}

        item.date = DateTime.fromSQL(item.date);

        if (!(temp_list[item.date.year])) {
            temp_list[item.date.year]={}
        }
        if (!(temp_list[item.date.year][item.date.month])) {
            (temp_list[item.date.year][item.date.month]) = {}
        }
        if  (!(temp_list[item.date.year][item.date.month]
                [item.date.day])) {
            temp_list[item.date.year][item.date.month][item.date.day] = []
        }

        (temp_list[item.date.year][item.date.month][item.date.day]).push(item);

        this.setState({total_costs: +this.state.total_costs + eval(item.cost),
            sorted_list: temp_list
        });
    };

    deleteCosts = (year, month, day, id, cost) => {
        console.log("delete cost", cost);
        let temp_list = this.state.sorted_list;
        temp_list[year][month][day] = temp_list[year][month][day].filter(i => i.id !== id);
        this.setState({total_costs: this.state.total_costs-cost,
            sorted_list: temp_list});
    };


    render() {
        const {total_costs, sorted_list} = this.state;
        return (
            <div><CostForm addCosts={this.addCosts}/>
                <CostList cost_list={sorted_list}
                          deleteCosts={this.deleteCosts}
                          total_costs={total_costs}/></div>
        );
    }
}

export default CostApp;

// import React from 'react';
// import CostList from './CostListComponent';
// import CostForm from './CostFormComponent';
// import { Info, DateTime } from 'luxon';
// import {base} from '../firebase';
//
// class CostApp extends React.Component {
//     state = {total_costs: 0, sorted_list:{}};
//
//     componentDidMount() {
//         this.cost_listRef = base.syncState('sorted_list', {
//             context: this,
//             state: 'sorted_list'
//         });
//         this.cost_listRef1 = base.syncState('total_costs', {
//             context: this,
//             state: 'total_costs',
//         });
//     }
//
//     componentWillUnmount() {
//         base.removeBinding(this.cost_listRef);
//         base.removeBinding(this.cost_listRef1);
//     }
//
//     addCosts = (item) => {
//         let temp_list;
//         console.log("sorted", this.state.sorted_list);
//         if ((this.state.sorted_list !== null) && (this.state.sorted_list !== undefined)
//                 && (this.state.sorted_list.cost)
//         && this.state.sorted_list !== 'Null') {
//              temp_list = this.state.sorted_list;
//         }else{temp_list={};
//             temp_list.list={};
//             temp_list.cost=0;}
//
//         item.date = DateTime.fromSQL(item.date);
//         console.log(item);
//         if ((!temp_list.list[item.date.year]) || (!temp_list.list[item.date.year].list)) {
//             temp_list.list[item.date.year] = {};
//             temp_list.list[item.date.year].list={};
//             temp_list.list[item.date.year].year_cost=0;
//         }
//         if ((!temp_list.list[item.date.year].list[item.date.month])
//             || (!temp_list.list[item.date.year].list[item.date.month].list)) {
//             (temp_list.list[item.date.year].list[item.date.month]) = {};
//             (temp_list.list[item.date.year].list[item.date.month]).list = {};
//             (temp_list.list[item.date.year].list[item.date.month]).month_cost = 0;
//         }
//         if  ((!temp_list.list[item.date.year].list[item.date.month].list
//                 [item.date.day])
//             ||(!temp_list.list[item.date.year].list[item.date.month].list
//                 [item.date.day].list)) {
//             temp_list.list[item.date.year].list[item.date.month].list[item.date.day] = {};
//             temp_list.list[item.date.year].list[item.date.month].list[item.date.day].list = [];
//             temp_list.list[item.date.year].list[item.date.month].list[item.date.day].day_cost = 0;
//         }
//         temp_list.list[item.date.year].year_cost += eval(item.cost);
//         temp_list.list[item.date.year].list[item.date.month].month_cost += eval(item.cost);
//         temp_list.list[item.date.year].list[item.date.month].list[item.date.day].day_cost += eval(item.cost);
//
//         console.log((temp_list.list[item.date.year].list[item.date.month].list[item.date.day].list).push(item));
//
//         this.setState({total_costs: +this.state.total_costs + eval(item.cost),
//             sorted_list: temp_list
//         });
//     };
//
//     deleteCosts = (year, month, day, id, cost) => {
//          console.log("delete cost", cost);
//          let temp_list = this.state.sorted_list;
//         temp_list.list[year].year_cost -= cost;
//         temp_list.list[year].list[month].month_cost -= cost;
//         temp_list.list[year].list[month].list[day].day_cost -= cost;
//          temp_list.list[year].list[month].list[day].list =
//              temp_list.list[year].list[month].list[day].list.filter(i => i.id !== id);
//          if (temp_list.list[year].list[month].list[day].list.length === 0) {
//              temp_list.list[year].list[month].list[day] = null;
//              if (temp_list.list[year].list[month].list.length === 0) {
//                  temp_list.list[year].list[month] = null;
//                  if (temp_list.list[year].list.length === 0) {
//                      temp_list.list[year] = null;
//                  }
//              }
//          }
//          this.setState({total_costs: this.state.total_costs-cost,
//             sorted_list: temp_list});
//     };
//
//
//     render() {
//         const {total_costs, sorted_list} = this.state;
//         return (
//             <div><CostForm addCosts={this.addCosts}/>
//                 <CostList cost_list={sorted_list}
//                           deleteCosts={this.deleteCosts}
//                           total_costs={total_costs}/></div>
//             );
//     }
// }
//
// export default CostApp;