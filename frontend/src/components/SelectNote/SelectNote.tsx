import { Select } from "radix-ui";

export default function SelectNote() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select" />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="3213">Bana</Select.Item>
          <Select.Item value="asd">adsad</Select.Item>
          <Select.Item value="ap1r12ple">sf</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
