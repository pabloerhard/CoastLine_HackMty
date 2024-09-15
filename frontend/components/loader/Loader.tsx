import { Loader2 } from "lucide-react";

export default function Component() {
  return (
    <div className="flex bg-white items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
        <span className="text-sm text-black">Loading...</span>
        <span className="sr-only">Loading, please wait...</span>
      </div>
    </div>
  );
}
