import React from "react"
import { Panel, Button } from "react-bootstrap"
import "../css/custom-styles.css"
import { compose, filter, identity, map, keys, path, sum } from "ramda"

const Calendar = ({ cost_list, deleteCosts, total_costs }) =>
  //prettier-ignore
  cost_list === "Null" ? "No item yet" : (
    <div>
      <h3>Total costs spent: {total_costs || "..."}</h3>
      {compose(
        map(item => (
          <Panel bsStyle="info" className="h-100" key={item}>
            <Panel.Heading>
              <Panel.Title componentClass="h2">Year {item}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {compose(
                map(i => <MonthList key={i} cost_list={cost_list} item={item} i={i} deleteCosts={deleteCosts} />),
                keys,
                path([item])
              )(cost_list)}
            </Panel.Body>
          </Panel>
        )),
        keys
      )(cost_list)}
    </div>
  )

const MonthList = ({ cost_list, item, i, deleteCosts }) => (
  <Panel className="col-md-3 col-xs-3 px-2 cards" key={i}>
    <h4>Month {i}</h4>
    {compose(
      map(el => <DayList key={el} cost_list={cost_list} item={item} i={i} el={el} deleteCosts={deleteCosts} />),
      filter(identity),
      keys,
      path([item, i])
    )(cost_list)}
  </Panel>
)

const DayList = ({ cost_list, item, i, el, deleteCosts }) => (
  <Panel key={el}>
    <Panel.Heading>
      <Panel.Title componentClass="h5">Day {el}</Panel.Title>
    </Panel.Heading>
    {compose(
      map(({ title, id, cost }) => (
        <div key={id} className="py-2">
          {cost}$ {title ? `(Purpose: ${title})` : " "}
          <Button bsStyle="link" bsSize="xs" onClick={() => deleteCosts(item, i, el, id, cost)}>
            x
          </Button>
        </div>
      )),
      filter(identity),
      path([item, i, el])
    )(cost_list)}
    Total:{" "}
    {//prettier-ignore
    compose(
        sum, 
        map(index => Number(cost_list[item][i][el][index].cost)), 
        keys, path([item, i, el]))(cost_list)}$
  </Panel>
)

export default Calendar
