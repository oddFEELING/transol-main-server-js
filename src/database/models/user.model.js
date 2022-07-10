const mongoose = require('mongoose');

/**
 * @constructor
 * @category Schemas
 *
 * @property {Object} personal - Personal data for users
 * @property {String} personal.firstname - User firstname
 * @property {String} personal.lastname - User lastname
 * @property {String} personal.email - Unique email for user
 * @property {String} personal.password - Unique password for user
 * @property {Number} personal.phone - Unique phoioine number for user
 * @property {String} personal.photo - Link to user profile image
 *
 * @property {Object} finance - financial data for users
 * @property {ObjectId} finance.curt_subscription - Current subscription of the user
 * @property {ObjectId} finance.prev-subscription - Previous subscription plan of the user
 * @property {Object[]} finance.banks - Array of bank details added by the user
 * @property {String} finance.banks.bank_name - Name of bank
 * @property {Number} finance.banks.account_no - Account number for the given bank
 * @property {Object[]} finance.transaction_hist - User financial trasaction history
 *
 * @property {Object} transol - User data relating to transol
 * @property {('individual'|'corporate')} [transol.account_type = 'individual'] - type of account created  by the user
 * @property {Number} [transol.transol_coins  =  0] - Transol coins (can be earned in-app)
 * @property {Numbetr} [transol.fleet_size = 0] - Number of registered vehicles belonging to user
 * @property {Object[]} transol.vehicles - List of Vehicles registered under user
 *
 * @property {Object} activity - User activities
 * @property {Number} [activity.total_repairs = 0] - Total repairs completed by user
 * @property {Object} activity.rating - User ratings details
 * @property {Number} activity.rating.total - User total ratings details
 * @property {Number} activity.rating.reviews - User number of reviews received
 */
const UserSchema = new mongoose.Schema(
  {
    // ======= personal stats -->
    personal: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      othernames: String,

      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        match:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      },

      password: {
        type: String,
        required: [true, 'Password is required'],
        unique: [true, 'Password must be unique'],
        minlength: [6, 'Minimum of 6 characters for the user password'],
      },

      phone: {
        type: Number,
        // required: [true, 'Phone number must be provided'],
        minlength: [11, 'Phone mumber should not be less than 11 digits'],
      },

      photo: {
        type: String,
        defualt:
          'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png',
      },
    },

    // ======= financial stats -->
    finance: {
      curt_subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscriptions',
      },
      prev_subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscriptions',
      },
      banks: [
        {
          bank_name: String,
          account_no: Number,
        },
      ],
      transaction_hist: [],
    },

    // ======= Transol stats -->
    transol: {
      account_type: {
        type: String,
        enum: ['individual', 'corporate'],
        default: 'individual',
      },
      transol_coins: { type: Number, default: 0 },
      fleet_size: { type: Number, default: 0 },
      vehicles: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicles' },
    },

    // ======= activity stats -->
    activity: {
      total_repairs: { type: Number, default: 0 },
      rating: {
        total: { type: Number, default: 0 },
        reviews: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true, collection: 'users' }
);

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
