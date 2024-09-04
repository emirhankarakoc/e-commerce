import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";

const Filters: React.FC<FiltersProps> = ({
  brands,
  batteries,
  memories,
  onBrandChange,
  onBatteryChange,
  onMemoryChange,
}) => {
  return (
    <div>
      <Accordion variant="bordered" selectionMode="multiple">
        <AccordionItem key="1" aria-label="Brand" title="Brand">
          <CheckboxGroup onChange={onBrandChange}>
            {brands.map((brand: string) => (
              //koy any gitsin amina koyayim, halil nereden cikardin basima typescripti...
              <Checkbox key={brand} value={brand}>
                {brand}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem key="2" aria-label="Batteries" title="Battery capacity">
          <CheckboxGroup onChange={onBatteryChange}>
            {batteries.map((battery: string) => (
              <Checkbox key={battery} value={battery}>
                {battery}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem key="3" aria-label="Memory" title="Memory">
          <CheckboxGroup onChange={onMemoryChange}>
            {memories.map((memory: string) => (
              <Checkbox key={memory} value={memory}>
                {memory}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filters;
