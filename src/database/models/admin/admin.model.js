const mongoose = require('mongoose');

/**
 * @constructor
 * @category Schemas
 *
 * @property {String} firstname - Admin first name
 * @property {String} lastname - Admin last name
 * @property {String} username - Admin username
 * @property {String} email - Admin email
 * @property {String} password - Admin password
 * @property {ObjectId} roles - Roles of Admin
 * @property {String} admin_key - Unique key ID assigned to admin
 */
const AdminSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Fist name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    username: {
      type: String,
      unique: [true, 'Username must be unique'],
      required: [true, 'Username is required'],
    },

    email: {
      type: String,
      required: [true, 'EMail must be provided '],
      unique: [true, 'Email already exists'],
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      unique: [true, 'Password already exits'],
      minlength: [6, 'Password cannot be less than 6 characters'],
    },

    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }],
    admin_key: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: 'admins',
  }
);

const AdminModel = mongoose.model('admins', AdminSchema);

module.exports = AdminModel;
