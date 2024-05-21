// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";

// import RenderHeading from "./RenderHeading";

// export default function DisplayEntities() {
// 	const [entities, setEntities] = useState([]);
//     const [entityName, setEntityName] = useState("");

//     useEffect(() => {
//         axios.get("/api/entities")
//         .then(res => {
//             setEntities(res.data);
//         });
//      }, []);

//      function handleClick(entityName) {
//         return () => {
//             console.log("you clicked me");
//             setEntityName(entityName);
//         }
//      }

// 	return (
//         <div className="flex">
//             <div className="border-solid border-2 border-black w-64 h-screen">
//                 Entities List
//                 <hr />
//                 {
//                     entities.map((entity) => {
//                         return <h2 key={entity.id}>
//                                 <button onClick={handleClick(entity.name)}>{entity.name}</button>
//                                 <hr />
//                             </h2>
//                     })
//                 }
//             </div>
//             <div className="border-solid border-2 border-black w-screen ml-4">
//                 Content of each entity
//                 <br />
//                 <RenderHeading name = { entityName } />
//             </div>
//         </div>
//     );

// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RenderTable from './RenderTable';

export default function DisplayEntities() {
    const [entities, setEntities] = useState([]);
    const [entityName, setEntityName] = useState("");

    useEffect(() => {
        axios.get("/api/entities")
            .then(res => {
                setEntities(res.data);
            })
            .catch(err => console.error("Failed to fetch entities:", err));
    }, []);

    function handleClick(entityName) {
        return () => {
            console.log("You clicked on:", entityName);
            setEntityName(entityName);
        };
    }

    return (
        <div className="flex">
            <div className="border-solid border-2 border-black w-64 h-screen">
                Entities List
                <hr />
                {entities.map(entity => (
                    <div key={entity.id}>
                        <button onClick={handleClick(entity.name)}>{entity.name}</button>
                        <hr />
                    </div>
                ))}
            </div>
            <div className="border-solid border-2 border-black w-screen ml-4">
                Content of each entity
                <br />
                <RenderTable name={entityName} />
            </div>
        </div>
    );
}
