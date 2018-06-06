import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//representational component for cost list;
const CostList = ({cost_list, deleteCosts}) => {
    console.log("received cost list", cost_list);
    return (
        <div>
            This is your cost list
        <table>
            <tbody>
            {cost_list.map((item) => {
                console.log(item);
                return (<tr onClick={() => deleteCosts(item)} key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.cost}</td>
                    <td>{item.date}</td></tr>);
            })}
            </tbody>
        </table>
        </div>
    );

};

export default CostList;