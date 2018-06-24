import React, { Fragment } from "react"
import Calendar from "./Calendar"
import AddOutlayForm from "./AddOutlayForm"
import { base } from "../firebase"
import { filter, isEmpty, pipe, map, groupBy, compose, applySpec } from "ramda"
import { v1 } from "react-native-uuid"
import { getDate, getMonth, getYear, parse } from "date-fns"


const groupByDates = pipe(
  groupBy(({ date }) => getYear(date)),
  map(groupBy(({ date }) => getMonth(date))),
  map(map(groupBy(({ date }) => getDate(date))))
)

const normalizeOutlayList = compose(
  map(
    applySpec({
      id: ({ id }) => id,
      title: ({ title }) => title,
      amount: ({ amount }) => Number(amount),
      date: ({ date }) => parse(date, "yyyy-MM-dd", new Date())
    })
  )
)

class Layout extends React.Component {
  state = { sorted_list: [] }

  componentDidMount() {
    this.cost_listRef = base.syncState("sorted_list", {
      context: this,
      state: "sorted_list"
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.cost_listRef)
  }

  addOutlay = item => {
    this.setState({ sorted_list: [item, ...this.state.sorted_list] })
  }

  deleteOutlay = id => {
    this.setState({ sorted_list: filter(i => i.id !== id, this.state.sorted_list) })
  }

  render() {
    const { sorted_list } = this.state
    return (
      <Fragment>
        <AddOutlayForm addOutlay={this.addOutlay} />
        <Calendar
          rawData={normalizeOutlayList(sorted_list)}
          cost_list={isEmpty(sorted_list) ? sorted_list : groupByDates(sorted_list)}
          deleteOutlay={this.deleteOutlay}
        />
      </Fragment>
    )
  }
}

export default Layout
