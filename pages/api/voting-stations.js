import voting_sites from 'data/voting_sites.json'

const columnMap = voting_sites.meta.view.columns.reduce((acc, column, index) => {
  acc[column.name] = { columnDetails: column, index };
  return acc;
}, {});

const brooklynSitesFormatted = voting_sites.data.flatMap((site, i) => {
  if (
    site[columnMap.BOROUGH.index] === 'BROOKLYN'
    || site[columnMap.CITY.index] === 'Brooklyn'
  ) {
    return {
        text: site[columnMap.SITE_NAME.index],
        lat: site[columnMap.Latitude.index],
        lng: site[columnMap.Longitude.index],
        originalIndexInData: i,
    }
  }
  return [];
});

export default (req, res) => {
  res.json(brooklynSitesFormatted);
};
