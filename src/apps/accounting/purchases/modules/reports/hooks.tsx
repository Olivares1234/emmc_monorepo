import { useMutation } from "@tanstack/react-query";
import { openToast } from "common/components/toast";
import { AnyObject } from "common/types";
import api from "utils/api";

import { TPurchasesState } from "../../redux/purchasesSlice";

import { reportApi } from "./components/constants";

export const useGenerateReports = (): [
  (
    params: AnyObject & {
      code: TPurchasesState["selectedReport"];
    },
  ) => Promise<void>,
  boolean,
] => {
  const { mutateAsync, isLoading } = useMutation(
    async (
      payload: AnyObject & {
        code: TPurchasesState["selectedReport"];
      },
    ) => {
      const { code, ...params } = payload;

      const endpoint = `/accounting/v1/purchases/reports${reportApi[code]}`;

      try {
        const response = await api.get(endpoint, { responseType: "blob", params });

        const disposition = response.headers["content-disposition"];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        const filename = matches?.[1]
          ? matches[1].replace(/['"]/g, "")
          : `${code}_report.xlsx`;

        const link = document.createElement("a");
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        link.href = downloadUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the temporary URL object
        window.URL.revokeObjectURL(downloadUrl);

        openToast({
          type: "success",
          message: "Reports Generated Successfully!!",
        });
      } catch (e) {
        throw new Error();
      }
    },
  );

  return [mutateAsync, isLoading];
};
