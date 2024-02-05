import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

interface AddressData {
  name: string;
  code: string;
}

const formatAddressSelect = (data: AddressData[]) =>
  data.map((d) => ({
    value: `${d.name}::${d.code}`,
    label: d.name,
  }));

export const useGetRegions = (): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isFetching } = useQuery(["REGIONS/OPTIONS"], async () => {
    try {
      const { data }: AxiosResponse<AddressData[]> = await api.get("/address/regions");
      return data;
    } catch (_e) {
      return [];
    }
  });
  return [formatAddressSelect(data ?? []), isFetching];
};

export const useGetProvince = (
  val: string,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const [, code] = val.split("::");

  const { data, isFetching } = useQuery(
    [`PROVINCE/OPTIONS/${code}`],
    async () => {
      try {
        const { data }: AxiosResponse<AddressData[]> = await api.get(
          `/address/provinces/${code}`,
        );
        return data;
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: !!code,
    },
  );
  return [formatAddressSelect(data ?? []), isFetching];
};

export const useGetMunicipality = (
  val: string,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const [, code] = val.split("::");

  const { data, isFetching } = useQuery(
    [`MUNICIPALITY/OPTIONS/${code}`],
    async () => {
      try {
        const { data }: AxiosResponse<AddressData[]> = await api.get(
          `/address/municipalities/${code}`,
        );
        return data;
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: !!code,
    },
  );
  return [formatAddressSelect(data ?? []), isFetching];
};

export const useGetBarangay = (
  val: string,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const [, code] = val.split("::");

  const { data, isFetching } = useQuery(
    [`BARANGAY/OPTIONS/${code}`],
    async () => {
      try {
        const { data }: AxiosResponse<AddressData[]> = await api.get(
          `/address/barangays/${code}`,
        );
        return data;
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: !!code,
    },
  );
  return [formatAddressSelect(data ?? []), isFetching];
};
