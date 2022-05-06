import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Search = () => {

    const [ term, setTerm ] = useState("")
    const [ results, setResults ] = useState([])

    // console.log(term)
    console.log(results)

    // first option - most used in the community
   useEffect(() => {
       const search = async () => {
           const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
            
                params: {
                    action: 'query', 
                    list: 'search',
                    origin: '*', 
                    format: 'json',
                    // srsearch: debounceTerm,
                    srsearch: term,
                },
           });

           setResults(data.query.search);
       };

    //    if (debounceTerm) {
    //     search()
    //    }

        if (term && results.length) {
            search();
        } else {

        
        const timeoutId = setTimeout(() => {
            if (term) {
                search();
                }
        }, 1500);   
        
        return () => {
            clearTimeout(timeoutId);
            console.log("clearing the timeout")
            }
        };
   },[term]);

//    second option - immediately called function
// useEffect(() => {
//     (async () => {
//         const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
//             params: {
//                 action: "query", 
//                 list: 'search', 
//                 origin: '*',
//                 format: 'json',
//                 srsearch: term,
//             },
//         });
//         setResults(data);
//     })(); 
// }, [term]);

// third option - regular promise
    // useEffect(() => {
    //     axios.get(term)
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    // })

    const renderResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
            <div className="right floated content">
                <a
                href={`https://en.wikipedia.org?curid=${result.pageid}`} 
                className="ui button">Go</a>
            </div>
            <div className="content">
                <div className="header">
                   <h2 > {result.title}</h2>
                   <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
                {/* {result.snippet} */}
            </div>
        </div>
        )
    });


    return (
        <div>
            <div className="ui form">
                <div className="ui field">
                    <label>What are you looking for?</label>
                        <input 
                        className="input"
                        placeholder="type your search term here"
                        type="text"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        />
                </div>
                <div className="ui celled list">
                {renderResults}
                </div>
            </div>
        </div>
    )
}

export default Search;