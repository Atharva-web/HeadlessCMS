import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DataForm = () => {
  const [entityName, setEntityName] = useState('');
  const [entityAttributes, setEntityAttributes] = useState([{}]);
  const [formData, setFormData] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/columnsAndValues/${entityName}`)
    .then(res => setEntityAttributes(res.data));
  }, [entityName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/data/${entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
      } else {
        const errorResult = await response.json();
        setResponseMessage(errorResult.error);
      }
    } catch (error) {
      setResponseMessage('Failed to create data');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dynamic Data Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Entity Name:</label>
          <input
            type="text"
            value={entityName}
            onChange={(e) => {
                setEntityName(e.target.value)
            }}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          {/* <input
            type="text"
            name="EmpName"
            onChange={handleInputChange}
            placeholder="Field 1"
          />
          <input
            type="text"
            name="EmpPosition"
            onChange={handleInputChange}
            placeholder="Field 2"
          /> */}
            
          {
            entityAttributes.map((entityAttribute) => {
                return <input
                key={entityAttribute.COLUMN_NAME}
                type="text"
                name={entityAttribute.COLUMN_NAME}
                onChange={handleInputChange}
                placeholder={entityAttribute.COLUMN_NAME}
              />
            })
          }

          {/* Add more fields as needed */}
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DataForm;