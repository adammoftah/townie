import voting_sites from 'data/voting_sites.json'

export default (req, res) => {
  res.json(voting_sites);
};
