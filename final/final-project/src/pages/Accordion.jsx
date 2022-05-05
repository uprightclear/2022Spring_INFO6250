import {useState} from 'react';
import React from 'react';
import '../CSS/Accordion.css'

function Accordion ({content}){
    const [isEntryOpen, setIsEntryOpen] = useState({});

    function toggleEntry(title){
        setIsEntryOpen({
            ...isEntryOpen,
            [title]: !isEntryOpen[title]
        });
    }


    return(
        <div className="accordion">
            {
                Object.keys(content).map( title =>{
                    return(
                        <div key={title} className={`accordion__entry ${isEntryOpen[title] ? 'accordion__entry--open':''}`}>
                            <button className="accordion__title" onClick={() => toggleEntry(title)} aria-expanded="false" aria-controls="sect1">
                                <p>{title}</p>
                            </button>
                            <section className="accordion__body">{content[title]}</section>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Accordion;