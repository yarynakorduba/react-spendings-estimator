import React from 'react';
import AddOutlayForm from './AddOutlayForm';
import Layout from "./Layout";

export const App = () => (
    <div className="container">
        <h1>My Cost App</h1>
        <AddOutlayForm/>
        <Layout />
    </div>
);