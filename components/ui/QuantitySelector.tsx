import Button from "../ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex justify-between items-center gap-5 w-min bg-transparent px-2 lg:w-full">
      <Button
        class="w-[30px] h-[30px] bg-[#F0F0F0] border-0 rounded-full min-h-6 min-w-6 p-0"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="minus-cart" width={9} height={2}/>
      </Button>
      <input
        class="text-center text-sm bg-transparent py-2.5 font-bold lg:w-full"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="w-[30px] h-[30px] bg-[#F0F0F0] border-0 rounded-full min-h-6 min-w-6 p-0"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="plus-cart" width={9} height={9}/>
      </Button>
    </div>
  );
}

export default QuantitySelector;
