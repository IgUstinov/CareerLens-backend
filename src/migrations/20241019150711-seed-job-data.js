module.exports = {
  async up(db) {
    await db.collection('jobs').insertMany([
      {
        title: 'Software Developer',
        description: 'Develop and maintain software applications.'
      },
      {
        title: 'Data Analyst',
        description: 'Analyze data and provide insights.'
      }
    ]);
  },

  async down(db) {
    await db.collection('jobs').deleteMany({ title: { $in: ['Software Developer', 'Data Analyst'] } });
  }
};
