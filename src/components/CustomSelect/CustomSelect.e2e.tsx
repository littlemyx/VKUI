import { CustomSelect, CustomSelectProps } from "../CustomSelect/CustomSelect";
import { describeScreenshotFuzz } from "../../testing/e2e/utils";
import { SelectType } from "../Select/Select";

describe("CustomSelect", () => {
  describeScreenshotFuzz(
    (props: CustomSelectProps) => (
      <CustomSelect
        placeholder="Не выбрана"
        {...props}
        options={[
          { value: 1, label: "Россия" },
          { value: 2, label: "Украина" },
          {
            value: 3,
            label: "Соединенное королевство Великобритании и Северной Ирландии",
          },
        ]}
      />
    ),
    [
      {
        value: [undefined, 1],
        disabled: [undefined, true],
        align: [undefined, "center", "right"],
      },
      {
        value: [3],
      },
      {
        selectType: [undefined, SelectType.Plain, SelectType.Accent],
        $adaptivity: "y",
      },
    ]
  );
});
