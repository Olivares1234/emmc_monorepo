/* eslint-disable @typescript-eslint/naming-convention */
import { Select } from "@mantine/core";
import { AnyObject } from "common/types";
import * as yup from "yup";

import {
  useGetBarangay,
  useGetMunicipality,
  useGetProvince,
  useGetRegions,
} from "./hooks";

export const addressPickerSchema = {
  region: yup.string().required().label("Region"),
  province: yup.string().required().label("Province"),
  municipality: yup.string().required().label("Municipality"),
  barangay: yup.string().label("Barangay"),
};

export const transformAddressDataToPayload = (data: AnyObject): AnyObject => {
  try {
    const [region, region_code] = data.region.split("::");
    const [province, province_code] = data.province.split("::");
    const [municipality, municipality_code] = data.municipality.split("::");
    let [barangay, barangay_code] = data.barangay.split("::");

    if (!barangay) {
      barangay = " ";
      barangay_code = " ";
    }

    return {
      ...data,
      region,
      region_code,
      province,
      province_code,
      municipality,
      municipality_code,
      barangay,
      barangay_code,
    };
  } catch (_e) {
    return data;
  }
};

export const transformPayloadToAddressValue = (data: AnyObject): AnyObject => {
  try {
    return {
      ...data,
      region: `${data.region as string}::${data.region_code as string}`,
      province: `${data.province as string}::${data.province_code as string}`,
      municipality: `${data.municipality as string}::${data.municipality_code as string}`,
      barangay: `${data.barangay as string}::${data.barangay_code as string}`,
    };
  } catch (_e) {
    return data;
  }
};

function AddressPicker({ form }: { form: AnyObject }) {
  const [regionData, loadingRegion] = useGetRegions();
  const [provinceData, loadingProv] = useGetProvince(form.values.region);
  const [municipalitiesData, loadingMun] = useGetMunicipality(form.values.province);
  const [barangayData, loadingBrgy] = useGetBarangay(form.values.municipality);

  return (
    <>
      <Select
        data={regionData}
        withAsterisk
        label="Region"
        {...form.getInputProps("region")}
        placeholder={loadingRegion ? "Loading..." : "Select region"}
        onChange={(e) => {
          form.setFieldValue("region", e);
          form.setFieldValue("province", "");
          form.setFieldValue("municipality", "");
          form.setFieldValue("barangay", "");
        }}
      />
      <Select
        data={provinceData}
        withAsterisk
        label="Province"
        {...form.getInputProps("province")}
        placeholder={loadingProv ? "Loading..." : "Select province"}
        onChange={(e) => {
          form.setFieldValue("province", e);
          form.setFieldValue("municipality", "");
          form.setFieldValue("barangay", "");
        }}
      />
      <Select
        data={municipalitiesData}
        withAsterisk
        label="Municipality"
        {...form.getInputProps("municipality")}
        placeholder={loadingMun ? "Loading..." : "Select municipality"}
        onChange={(e) => {
          form.setFieldValue("municipality", e);
          form.setFieldValue("barangay", "");
        }}
      />
      <Select
        data={barangayData}
        label="Barangay"
        placeholder={loadingBrgy ? "Loading..." : "Select barangay"}
        {...form.getInputProps("barangay")}
      />
    </>
  );
}

export default AddressPicker;
