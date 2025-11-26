import { Sequelize } from 'sequelize';
import { initUser } from '../models/user';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: true,
});

initUser(sequelize);

export const connectDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
