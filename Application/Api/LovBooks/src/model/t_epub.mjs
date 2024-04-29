const EpubModelTable = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_epub",
      {
        epub: {
          type: DataTypes.BLOB('long'),
          allowNull: true,
        },
      },
      {
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
      }
    );
  };
  
  export { EpubModelTable };
  