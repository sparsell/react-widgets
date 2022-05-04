import React from 'react';
// import Accordion from './Components/Accordion';
import Search from './Components/Search';

const items = [
    {
        title: "What is React?", 
        content: "React is a front end JavaScript framework"
    },
    {
        title: 'Why use React?', 
        content: "Loreum Ipsum"
    }, 
    {
        title: "How do you learn React?",
        content: "Loreum ipsum"
    }
]

// export default () => {
    const App = () => {
    return (
        <div>
            <br />
            {/* <Accordion items={items}/> */}
            <Search />
        </div>
    )
};

export default App;