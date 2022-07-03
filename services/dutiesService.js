const db = require("../config/db");

const Duties = require("../models/duty.model");

/**
 * Logic for reading and writing duties data
 */
class FeedbackService {
  /**
   * Get all duties items
   */
  async getList() {
    try {
      const data = await Duties.find();
      return data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /**
   * Add a new duty item
   * @param {*} Id The Id of Duty
   */
  async getDuty(Id) {
    try {
      const data = await Duties.findOne({ Id: Id });
      return data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /**
   * Delete a duty item
   * @param {*} Id The Id of Duty
   */
  async deleteDuty(Id) {
    try {
      const data = await Duties.findOneAndDelete({ Id: Id });
      return data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /**
   * Add a new duty item
   * @param {*} Id The Id of Duty
   * @param {*} Name The Name of the Duty
   */
  async addDuty(Id, Namwe) {
    try {
      const data = await Duties.create({
        Id,
        Name,
      });
      return data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /**
   * Update a duty item
   * @param {*} Id The Id of Duty
   * @param {*} Name The Name of the Duty
   */
  async putDuty(dutyId, { Id, Name }) {
    try {
      const data = await Duties.findOneAndUpdate(
        { Id: dutyId },
        { Id, Name },
        {
          returnDocument: "after",
        }
      );
      return data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
}

module.exports = FeedbackService;
