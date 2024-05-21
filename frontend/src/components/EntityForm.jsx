// import React, { useState } from 'react';

// const EntityForm = () => {
//   // State to manage form inputs
//   const [entityName, setEntityName] = useState('');
//   const [attributes, setAttributes] = useState([ { name: '', type: '' } ]);

//   // Handle input change for attribute fields
//   const handleAttributeChange = (index, key, value) => {
//     const updatedAttributes = [...attributes];
//     updatedAttributes[index][key] = value;
//     setAttributes(updatedAttributes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       name: entityName,
//       attributes: attributes.filter(attr => attr.name && attr.type)
//     };
    
//     try {
//       const response = await fetch('/api/entity', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create entity');
//       }

//       console.log('Entity created successfully!');
//       alert("Entity created successfully");
//       // Perform any further actions, such as redirecting or showing a success message
//     } catch (error) {
//       console.error('Error creating entity:', error.message);
//       alert("Error creating entity");
//       // Handle the error, show an error message, etc.
//     }
//   };

//   return (
//     <div>
//       <h2>Create Entity</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Entity Name:
//           <input
//             type="text"
//             value={entityName}
//             onChange={(e) => setEntityName(e.target.value)}
//           />
//         </label>
//         <br /> <br />
//         {attributes.map((attribute, index) => (
//           <div key={index}>
//             <label>
//               Attribute Name:
//               <input
//                 type="text"
//                 value={attribute.name}
//                 onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
//               />
//             </label>

//             <label>
//               Attribute Type:
//               <input
//                 type="text"
//                 value={attribute.type}
//                 onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
//               />
//             </label>
//           </div>
//         ))}
//         <button type="button" onClick={() => setAttributes([...attributes, { name: '', type: '' }])}>
//           Add Attribute
//         </button>
//         <br /><br />
//         <button type="submit">Create Entity</button>
//       </form>
//     </div>
//   );
// };

// export default EntityForm;
/*
import { useState } from 'react';

const EntityForm = () => {
  // State to manage form inputs
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([{ name: '', type: '' }]);
  const [message, setMessage] = useState('');

  // Handle input change for attribute fields
  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const createTable = async() => {
    try {
      const response = await fetch(`/api/createTable/${entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // in entities this will create an entry 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      console.log('Entity and its table created successfully!');
      alert("Entity and its table created successfully");
      setMessage('');
    }
    catch (error) {
      console.error('Error creating table:', error.message);
      setMessage(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("attributes =", attributes);
    const formData = {
      name: entityName,
      attributes: attributes.filter(attr => attr.name && attr.type)
    };

    try {
      const response = await fetch('/api/entity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // in entities this will create an entry 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      console.log('Entity and its table created successfully!');
      alert("Entity and its table created successfully");
      setMessage('');
    }
    catch (error) {
      console.error('Error creating entity:', error.message);
      setMessage(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', width: '400px' }}>
        <h2 style={{ textAlign: 'center' }}>Create Entity</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '10px', width: '100%' }}>
            Entity Name:
            <input
              type="text"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              style={{ padding: '10px', width: '100%', marginTop: '5px' }}
            />
          </label>
          {attributes.map((attribute, index) => (
            <div key={index} style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ marginBottom: '5px', display: 'block' }}>
                Attribute Name:
                <input
                  type="text"
                  value={attribute.name}
                  onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                  style={{ padding: '10px', width: '100%', marginTop: '5px' }}
                />
              </label>
              <label style={{ marginBottom: '5px', display: 'block' }}>
                Attribute Type:
                <select
                  value={attribute.type}
                  onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                  style={{ padding: '10px', width: '100%', marginTop: '5px' }}
                >
                  <option value="">Select Type</option>
                  <option value="STRING">String</option>
                  <option value="INTEGER">Integer</option>
                  <option value="FLOAT">Float</option>
                  <option value="BOOLEAN">Boolean</option>
                  <option value="DATE">Date</option>
                </select>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setAttributes([...attributes, { name: '', type: '' }]);
              createTable()
            }}
            style={{ padding: '10px', marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add Attribute
          </button>
          <button
            type="submit"
            style={{ padding: '10px', marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Create Entity
          </button>
        </form>
        {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default EntityForm;
*/

import { useState } from 'react';

const EntityForm = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([{ name: '', type: '' }]);
  const [message, setMessage] = useState('');

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', type: '' }]);
  };

  const createTable = async (entityName, attributes) => {
    try {
      const response = await fetch(`/api/createTable/${entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attributes })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      alert('Table created successfully!');
      setMessage('');
    } catch (error) {
      console.error('Error creating table:', error.message);
      setMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: entityName,
      attributes: attributes.filter(attr => attr.name && attr.type)
    };

    try {
      const response = await fetch('/api/entity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      await createTable(entityName, formData.attributes);
      setMessage('Entity and its table created successfully!');
    } catch (error) {
      console.error('Error creating entity:', error.message);
      setMessage(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', width: '400px' }}>
        <h2 style={{ textAlign: 'center' }}>Create Entity</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '10px', width: '100%' }}>
            Entity Name:
            <input
              type="text"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              style={{ padding: '10px', width: '100%', marginTop: '5px' }}
            />
          </label>
          {attributes.map((attribute, index) => (
            <div key={index} style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ marginBottom: '5px', display: 'block' }}>
                Attribute Name:
                <input
                  type="text"
                  value={attribute.name}
                  onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                  style={{ padding: '10px', width: '100%', marginTop: '5px' }}
                />
              </label>
              <label style={{ marginBottom: '5px', display: 'block' }}>
                Attribute Type:
                <select
                  value={attribute.type}
                  onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                  style={{ padding: '10px', width: '100%', marginTop: '5px' }}
                >
                  <option value="">Select Type</option>
                  <option value="STRING">String</option>
                  <option value="INTEGER">Integer</option>
                  <option value="FLOAT">Float</option>
                  <option value="BOOLEAN">Boolean</option>
                  <option value="DATE">Date</option>
                </select>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addAttribute}
            style={{ padding: '10px', marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add Attribute
          </button>
          <button
            type="submit"
            style={{ padding: '10px', marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Create Entity
          </button>
        </form>
        {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default EntityForm;
