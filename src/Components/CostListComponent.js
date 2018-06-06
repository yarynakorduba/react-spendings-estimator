import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//representational component for cost list;
const CostList = ({cost_list, deleteCosts, total_costs}) => {
    console.log("received cost list", cost_list);
    return (
        <div>
            <h3>Total costs spent: {total_costs}</h3>
            <h3>This is your cost list</h3>
        <table>
            <tbody>
            {cost_list.map((item) => {
                console.log(item);
                return (<tr onClick={() => deleteCosts(item)} key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.cost} $</td>
                    <td>{item.date.toFormat('yyyy LLL dd')}</td>
                </tr>);
            })}
            </tbody>
        </table>
        </div>
    );

};

export default CostList;