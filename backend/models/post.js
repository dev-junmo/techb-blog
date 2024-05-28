
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    category: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subTitle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // user: {
    //   type: DataTypes.STRING(10),
    //   allowNull: false
    // },
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    // hashtags: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
    //   allowNull: true
    // },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize,
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
  };

  return Post;
};