import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CostApp from './Components/CostAppComponent';

class App extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <h1>My Cost App</h1>
                <CostApp/>
            </div>
        );
    }
}

ReactDOM.render(
<App />,
document.getElementById('app')
);

module.hot.accept();
