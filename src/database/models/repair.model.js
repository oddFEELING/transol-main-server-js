const mongoose = require('mongoose');

/**
 * @constructor
 * @category Schemas
 *
 * @property {ObjectId} vehicle - The ID of the vehicle to be repaired. this can be populated upon request or database query with the .populate() method
 *
 * @property {Object} request - Information of the request that was made for the repair.
 * @property {ObjectId} request.initiator - Id of the user that initiates a request.
 * @property {ObjectId[]} request.mechanics - Array of mongoose schema IDs for mechanics assigned to the repair session.
 * @property {UUID} request.requestID - This is the ID of the current request. Would be gotten from the session ID on the session object
 * @property {Object} request.geolocation - GPS data of the initiator. This encompasses the current location of the user who requests for a repair session.
 *
 * @property {Object} status - Holds data on the status of the repair
 * @property {('not-started' | 'running' | 'paused' | 'failed' | 'success')} [status.state = 'not-running'] - Indicates the current state of the repair session
 * @property {Date} status.start_time - Date and time repair was started.
 * @property {Date} status.end_time - Date and time repair was ended.
 *
 * @property {Object} rating - Details of ratings for the repair session
 * @property {Number} [rating.user_rating = null] - Ratings given to user by mechanic
 * @property {Number} [ratings.mechanic_rating = null] - Rating points given to the mechanic by the user.
 */
const RepairSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicles',
    },

    request: {
      initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },

      mechanics: [
        {
          type: mongoose.schema.Types.ObjectId,
          rel: 'mechanics',
        },
      ],

      requestID: String,

      geolocation: {
        x: Number,
        y: Number,
      },
    },

    status: {
      state: {
        type: String,
        defauolt: 'not-started',
        enum: ['not-started', 'running', 'paused', 'failed', 'success'],
      },
      // start_time: Date,
      // end_time: Date,
    },

    rating: {
      user_rating: { type: Number, default: null },
      mechanic_rating: { type: Number, default: null },
    },
  },
  { collection: 'repairs', timestamps: true }
);

const RepairModel = mongoose.model('repairs', RepairSchema);

module.exports = RepairModel;

/**
 * If the customer continues with the repair, no need for diagnosis payment.
 *
 *
 * Number plate
 * Car model
 * Chasis number
 * Vehicle identification number (VIN)
 */
