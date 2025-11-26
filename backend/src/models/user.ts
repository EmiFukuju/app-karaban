import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public userType!: 'host' | 'guest';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM('host', 'guest'),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
    }
  );
};

export default User;
