import React from "react";
import { PeriodTab } from "../period-tab";
import { FormatTab } from "../format-tab";

interface Props {
  period: "today" | "week";
  format: "c" | "f";
}

export const HeaderPanel = ({ period , format}: Props) => {
  return (
    <div className="w-full flex flex-row items-center justify-start flex-wrap p-5">
      <h1 className="text-4xl font-bold w-full md:w-auto mb-2 md:mb-0">Mi Clima</h1>
      <div className="grid grid-cols-2 h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground border-input border md:mx-4">
        <PeriodTab period="today" isActive={period === "today"} />
        <PeriodTab period="week" isActive={period === "week"} />
      </div>
      <div className="flex flex-1" />
      <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground border-input border mx-4">
        <FormatTab format="c" isActive={format === "c"} />
        <FormatTab format="f" isActive={format === "f"} />
      </div>
    </div>
  );
};
