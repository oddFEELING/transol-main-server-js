const mongoose = require('mongoose');

/**
 *
 * @constructor
 * @category Schemas
 * @property {Object} personal - Personal data for mechanics
 * @property {String} personal.firstname - User firstname
 * @property {String} personal.lastname - User lastname
 * @property {String} personal.email - Unique email for user
 * @property {String} personal.password - Unique password for user
 * @property {Number} personal.phone - Unique phoioine number for user
 * @property {String} personal.photo - Link to user profile image
 *
 * @property {Object} finance - financial data for mechanics
 * @property {Object} finance.bamk - Bank details
 * @property {String} finance.bank.name - Bank name
 * @property {Number} finance.bank.account_no - Bank Account number
 *
 * @property {Object} transol - Mechanic data relating to transol
 * @property {('mecahnical' | 'electrical')} [transol.core = 'mecahnical'] - Type of vehicles mechanic is affiliated with.
 * @property {('car'|'bus'|'bike')} [transol.speciality = 'car'] - Type of vehicle mechanic is best suited to fix.
 *@property {Number} [transol.transol_coins  =  0] - Transol coins (can be
 * @property {String} transol.transol_no - Special ID number assiigned by transol
 *
 * @property {Object} activity - Mechanics activities
 * @property {Number} [activity.total_repairs = 0] - Total repairs completed by Mechanics
 * @property {Object} activity.rating - Mechanics ratings detail
 * @property {Number} activity.rating.total - Mechanic total ratings details
 * @property {Number} activity.rating.reviews - Mechanic number of reviews received
 *
 * @property {Object} kyc - KYC data for mechanics
 * @property {Number} kyc.years_of_exp - mechanic years of experience
 * @property {String} kyc.drivers_license - Url to drivers license of mechanic
 * @property {Object} kyc.guarrantor - Guarrantor object
 * @property {String} kyc.guarrantor.name - Name of guarrantor
 * @property {Number} kyc.guarrantor.phone -Phone numnber of guarrantor
 * @property {String} kyc.guarrantor.address - Address of gurantor
 */
const MechanicSchema = new mongoose.Schema(
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
        minlength: [6, 'Password should be more than 6 characters'],
      },

      phone: {
        type: Number,
        // required: [true, 'Phobe number must be provided'],
        minlength: [11, 'Phone number should not be loess than 11 digits'],
      },

      photo: {
        type: String,
        default:
          'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png',
      },
    },

    // ======= financial stats -->
    finance: {
      bank: {
        name: String,
        account_no: Number,
      },
    },

    transol: {
      core: {
        type: String,
        //   required: true,
        default: 'mechanical',
        enum: ['mechanical', 'electric'],
      },

      speciality: {
        type: String,
        defaultl: 'car',
        //   required: true,
        enum: ['car', 'bus', 'bike'],
      },

      transol_coins: { type: Number, default: 0 },
      // transol_no: { type: String, unique: true, required: true },
    },

    // ======= activity stats -->
    activity: {
      total_repairs: { type: Number, default: 0 },
      rating: {
        total: { type: Number, default: 0 },
        reviews: { type: Number, default: 0 },
      },
    },

    // ======= kyc info -->
    kyc: {
      // years_of_exp: { type: Number, required: true },
      // drivers_license: { type: String, required: true },
      guarrantor: {
        name: String,
        phone: Number,
        address: String,
      },
    },
  },
  { timestamps: true, collection: 'mechanics' }
);

const MecahnicModel = mongoose.model('mecahnics', MechanicSchema);

module.exports = MecahnicModel;
