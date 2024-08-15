module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Automatically generates a UUID
        primaryKey: true, // Set as primary key
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: true, // Allow null values if needed
      },
      userAddress: {
        type: Sequelize.STRING,
        allowNull: true, // Allow null values if needed
      },
      userMobileNumber: {
        type: Sequelize.BIGINT,
        allowNull: true, // Allow null values if needed
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Email should not be null
        unique: true, // Ensure the email is unique
        validate: {
          isEmail: true, // Validate that the value is a valid email
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, // Default to true if not specified
        allowNull: false, // Make sure this field is always set
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // Password should not be null
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true, // Allow null values if needed
      },
      profilePictureUrl: {
        type: Sequelize.STRING,
        allowNull: true, // Allow null values if not applicable
      }
    }, {
      timestamps: true, // Enable timestamps
      createdAt: 'createdAt', // Customize the name of the createdAt field
      updatedAt: 'updatedAt'  // Customize the name of the updatedAt field
    });
  
    return Users; // Ensure the model name matches
  };
  