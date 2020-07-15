import testingSiteData from 'data/testing_sites.json';

export default (req, res) => {
  res.json(testingSiteData);
}
