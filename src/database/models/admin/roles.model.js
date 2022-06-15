const mongoose = require('mongoose');

/**
 * @constructor
 * @category Schemas
 *
 * @property {String} title - The name given to the role
 * @property {('view'|'edit'|'delete'|'super')} Permissions - Available persissions for the role
 */
const RoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Role title is required'],
      unique: [true, 'Role already exists'],
    },

    Permissions: [
      {
        type: String,
        default: 'view',
        enum: ['view', 'edit', 'delete', 'super'],
      },
    ],
  },
  { timestamps: true, collection: 'roles' }
);

const RoleModel = mongoose.model('roles', RoleSchema);

module.exports = RoleModel;
