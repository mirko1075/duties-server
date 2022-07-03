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
    const data = await Duties.find();
    return data;
  }

  /**
   * Add a new duty item
   * @param {*} Id The Id of Duty
   */
  async getDuty(Id) {
    const data = await Duties.findOne({ Id: Id });
    return data;
  }

  /**
   * Delete a duty item
   * @param {*} Id The Id of Duty
   */
  async deleteDuty(Id) {
    const data = await Duties.findOneAndDelete({ Id: Id });
    return data;
  }

  /**
   * Add a new duty item
   * @param {*} Id The Id of Duty
   * @param {*} Name The Name of the Duty
   */
  async addDuty(Id, Name) {
    const existentDuty = await this.getDuty(Id);
    if (existentDuty) throw new Error("Id already present in DB");
    const data = await Duties.create({
      Id,
      Name,
    });
    return data;
  }

  /**
   * Update a duty item
   * @param {*} Id The Id of Duty
   * @param {*} Name The Name of the Duty
   */
  async putDuty(dutyId, { Id, Name }) {
    if (Id !== "" && Id !== dutyId) {
      const existentDuty = await this.getDuty(Id);
      if (existentDuty) throw new Error("Id already present in DB");
    }
    const data = await Duties.findOneAndUpdate(
      { Id: dutyId },
      { Id, Name },
      {
        returnDocument: "after",
      }
    );
    return data;
  }
}

module.exports = FeedbackService;
