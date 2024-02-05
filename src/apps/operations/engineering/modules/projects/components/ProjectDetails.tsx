import { Description } from "common/components/description";

import { Project } from "../types";

import { projectDetailsFormat } from "./constants";

interface Props {
  data: Project;
}

function ProjectDetails({ data }: Props) {
  return <Description data={data} format={projectDetailsFormat} columns={2} />;
}

export default ProjectDetails;
