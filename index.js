const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Connect to the database
const sequelize = new Sequelize('headlesscms', 'root', 'root', {
  dialect: 'mysql', // or 'postgres'
  host: 'localhost'
});

// Define Entity model
const Entity = sequelize.define('Entity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
});

// Define Attribute model
const Attribute = sequelize.define('Attribute', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    timestamps: false
});


// Define relationship between Entity and Attribute
Entity.hasMany(Attribute);
Attribute.belongsTo(Entity);

// Synchronize the models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error creating database tables:', err));

// Routes

// Create entity
app.post('/api/entity', async (req, res) => {
  try {
    const { name, attributes } = req.body;
    const entity = await Entity.create({ name });

    console.log("attributes\n", attributes);


    for (const attr of attributes) {
      await Attribute.create({ name: attr.name, type: attr.type, EntityId: entity.id });
    }

    res.json({ message: 'Entity created successfully!' });
  } catch (error) {
    console.error('Error creating entity:', error);
    res.status(500).json({ error: 'Failed to create entity' });
  }
});

// Read all entities
app.get('/api/entities', async (req, res) => {
  try {
    const entities = await Entity.findAll({ include: [Attribute] });
    res.json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ error: 'Failed to fetch entities' });
  }
});

app.get("/api/dataOfEntry/:entityName", async(req, res) => {
  try {
    const entity = req.params.entityName;
    const tableName = entity.toLowerCase() + "s";
    
    const query = `SELECT * FROM ${tableName}`;
    const [dataValues] = await sequelize.query(query);
    
    res.json(dataValues);

  }
  catch (error) {
    console.log("something happened when fetching dataEntries:", error.message);
  }
});

// Create data for an entity
app.post('/api/data/:entityName', async (req, res) => {
  const entityName = req.params.entityName;
  const data = req.body; // JSON input

  try {
    const entity = await Entity.findOne({ where: { name: entityName } });

    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }

    const tableName = entityName.toLowerCase() + "s";

    // Define a function to create the model dynamically
    async function createDynamicModel(data) {
      const attributes = {};
      for (const key in data) {
        attributes[key] = {
          type: typeof data[key] === 'number' ? DataTypes.INTEGER : DataTypes.STRING,
          allowNull: false,
        }
      }

      const table = sequelize.define(`${tableName}`, attributes, { timestamps: false });

      Entity.hasMany(table);
      table.belongsTo(Entity);

      await sequelize.sync();

      return table;
    }

    // Create the dynamic model
    const DynamicModel = await createDynamicModel(data);
    console.log("DynamicModel\n", DynamicModel);

    // Insert the data into the database
    data["EntityId"] = entity._previousDataValues.id;

    await DynamicModel.create(data)
    .then(entry => {
        console.log('Data inserted:', entry.toJSON());
    })
      .catch(error => {
        console.error('Error inserting data:', error.message);
    });

    res.json({ message: 'Data created successfully!' });
  } catch (error) {
    console.error('Error creating data:', error.message);
    res.status(500).json({ error: 'Failed to create data' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
