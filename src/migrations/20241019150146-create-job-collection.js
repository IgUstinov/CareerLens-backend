module.exports = {
  async up(db) {
    await db.createCollection('jobs');
  },

  async down(db) {
    await db.collection('jobs').drop();
  }
};
