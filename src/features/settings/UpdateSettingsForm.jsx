import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings } = useSettings();
  const { mutate } = useUpdateSetting();
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    mutate({
      [field]: value,
    });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={!settings}
          id="min-nights"
          defaultValue={settings?.minBookingLeft}
          onBlur={(e) => handleUpdate(e, "minBookingLeft")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={!settings}
          id="max-nights"
          defaultValue={settings?.maxBookingLeft}
          onBlur={(e) => handleUpdate(e, "maxBookingLeft")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={!settings}
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={!settings}
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
