/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineCheck, AiOutlineWarning } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { RxRulerHorizontal } from "react-icons/rx";
import { VscNotebook } from "react-icons/vsc";
import { Select, Stepper } from "@mantine/core";
import LoaderWithText from "common/components/loader/LoaderWithText";
import { NoData } from "common/no-data";
import { FormModal } from "common/types";

import { useGetSingleCosting } from "../hooks";

import {
  consumablesDefault,
  COSTING_TYPES,
  laborsDefault,
  rscDefaultValue,
} from "./constants";
import Consumables from "./Consumables";
import { CostingContext } from "./context";
import Labors from "./Labors";
import Overview from "./Overview";
import RSC from "./RSC";
import {
  ConsumablesForm,
  CostingModalProps,
  LaborsForm,
  SpecificationsValue,
} from "./types";

function CostingModal({ onClose, data, isEditMode }: FormModal<CostingModalProps>) {
  const [costingType, setCostingType] = useState(COSTING_TYPES[0]);

  const { projectId, costingId } = data as CostingModalProps;

  const [costingDetails, isLoading] = useGetSingleCosting(
    costingId ? Number(costingId) : null,
  );

  const [active, setActive] = useState(0);
  const [specifications, setSpecsValue] = useState<SpecificationsValue>(rscDefaultValue);
  const [labors, setLaborsValue] = useState<LaborsForm>(laborsDefault);
  const [consumables, setConsumablesValue] =
    useState<ConsumablesForm>(consumablesDefault);

  const nextStep = useCallback(
    () => setActive((current) => (current < 4 ? current + 1 : current)),
    [],
  );
  const prevStep = useCallback(
    () => setActive((current) => (current > 0 ? current - 1 : current)),
    [],
  );

  const specsContent = useMemo<Record<string, JSX.Element>>(
    () => ({
      RSC: <RSC onClose={onClose} />,
      default: <div>Invalid Specification Content</div>,
    }),
    [],
  );

  const value = useMemo(
    () => ({
      costingType,
      active,
      nextStep,
      prevStep,
      setConsumablesValue,
      labors,
      setSpecsValue,
      setLaborsValue,
      consumables,
      specifications,
      projectId,
      costingId,
    }),
    [
      costingType,
      active,
      nextStep,
      prevStep,
      labors,
      consumables,
      specifications,
      projectId,
      costingId,
    ],
  );

  useEffect(() => {
    if (!isLoading && costingDetails) {
      const {
        labors: costingLabors,
        consumables: costingConsumables,
        project: _proj,
        ...specs
      } = costingDetails;
      setSpecsValue(specs);
      setConsumablesValue({
        consumables: costingConsumables,
        skip: false,
      });
      setLaborsValue({
        labors: costingLabors,
        skip: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="flex flex-grow flex-col">
      <LoaderWithText
        text="Loading costing data"
        show={isLoading && Boolean(isEditMode)}
      />
      {!isLoading && !costingDetails && isEditMode && (
        <NoData message="Failed to load costing data" />
      )}
      {((!isLoading && costingDetails) || !isEditMode) && (
        <CostingContext.Provider value={value}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowNextStepsSelect={false}
          >
            <Stepper.Step
              color="teal"
              label="Specifications"
              completedIcon={<AiOutlineCheck />}
              icon={<RxRulerHorizontal size="1.1rem" />}
            >
              <Select
                label="Costing type"
                data={COSTING_TYPES.map((costing) => ({
                  label: costing,
                  value: costing,
                }))}
                value={costingType}
                onChange={(value) => setCostingType(value as string)}
                mb={18}
              />
              {specsContent[costingType] ?? specsContent.default}
            </Stepper.Step>
            <Stepper.Step
              completedIcon={<AiOutlineCheck />}
              color="teal"
              label="Labors"
              icon={<AiOutlineWarning size="1.1rem" />}
            >
              <Labors />
            </Stepper.Step>
            <Stepper.Step
              completedIcon={<AiOutlineCheck />}
              color="teal"
              label="Consumables"
              icon={<MdOutlineInventory size="1.1rem" />}
            >
              <Consumables />
            </Stepper.Step>
            <Stepper.Step
              completedIcon={<AiOutlineCheck />}
              color="teal"
              label="Overview"
              icon={<VscNotebook size="1.1rem" />}
            >
              <Overview onClose={onClose} />
            </Stepper.Step>
          </Stepper>
        </CostingContext.Provider>
      )}
    </div>
  );
}

export default CostingModal;
