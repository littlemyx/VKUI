import { describeScreenshotFuzz } from "../../testing/e2e/utils";
import { SelectMimicry, SelectMimicryProps } from "./SelectMimicry";
import { SelectType } from "../Select/Select";

describe("SelectMimicry", () => {
  describeScreenshotFuzz(
    (props: SelectMimicryProps) => (
      <SelectMimicry placeholder="Не выбрано" {...props} />
    ),
    [
      {
        children: [undefined, "Россия"],
        disabled: [undefined, true],
      },
      {
        // самый длинный в мире топоним из одного слова
        // https://ru.wikipedia.org/wiki/Тауматафакатангихангакоауауотаматеатурипукакапикимаунгахоронукупокаифенуакитанатаху
        children: [
          "Вершина холма, где Таматеа, мужчина с большими коленями, который скатывался, " +
            "забирался и проглатывал горы, известный как поедатель земли, играл на своей флейте для своей возлюбленной",
        ],
        multiline: [undefined, true],
      },
      {
        children: ["SelectType.Plain"],
        selectType: [SelectType.Plain],
        $adaptivity: "y",
      },
      {
        children: ["SelectType.Accent"],
        selectType: [SelectType.Accent],
        $adaptivity: "y",
      },
    ]
  );
});
