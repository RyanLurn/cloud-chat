import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useResumableStreamsStore from "@/features/chat/stores/resumable";

function ResumableStreamsSwitch({ isDisabled }: { isDisabled: boolean }) {
  const isResumable = useResumableStreamsStore((state) => state.isResumable);
  const setIsResumable = useResumableStreamsStore(
    (state) => state.setIsResumable
  );
  return (
    <div className="flex items-center gap-x-2">
      <Switch
        checked={isResumable}
        onCheckedChange={setIsResumable}
        id="resumable-streams"
        disabled={isDisabled}
      />
      <Label htmlFor="resumable-streams">Resumable streams</Label>
    </div>
  );
}

export default ResumableStreamsSwitch;
