import countries from "world-countries";

const formattedCountries = countries.map((item) => ({
  value: item.ccn3,
  label: item.name.common,
  flag: item.flag,
  latlng: item.latlng,
  region: item.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((item) => item.value === value);

  return { getAll, getValue: getByValue };
};

export default useCountries;
