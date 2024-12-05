import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import { FunctionalComponent } from "preact";

interface SelectComponentProps {
  setOrgan: (organ: string) => void;
}

const frameworks = createListCollection({
  items: [
    { label: "🌷 Flower", value: "flower" },
    { label: "🍀 Leaf", value: "leaf" },
    { label: "🍓 Fruit", value: "fruit" },
    { label: "🌴 Bark", value: "bark" },
  ],
});

const SelectConponent: FunctionalComponent<SelectComponentProps> = ({
  setOrgan,
}) => {
  return (
    <Stack gap="5" width="320px">
      <SelectRoot collection={frameworks} size={"xs"}>
        <SelectLabel fontSize={"sm"}>Choose an organ </SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="🌷 Flower" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((plant) => (
            <SelectItem
              item={plant}
              key={plant.value}
              onClick={() => {
                setOrgan(plant.value);
              }}
            >
              {plant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  );
};

export default SelectConponent;
