import { Description } from "common/components/description";

import { NoteDetailsProps } from "../types";

function NoteDetails(data: NoteDetailsProps) {
  return (
    <Description
      data={data}
      format={[
        {
          label: "Note Type",
          key: "note_type",
        },
        {
          label: "Note",
          key: "note",
        },
        {
          label: "Note Amount",
          key: "note_amount",
        },
      ]}
      columns={1}
    />
  );
}

export default NoteDetails;
