// Root layout for the country picker at "/" (FR-022). No language chosen yet: English, with the
// regional languages on the page itself.

import QuickExit from "../../components/QuickExit";
import { Shell } from "../shell";
import "../globals.css";

export { metadata, viewport } from "../shell";

export default function StartLayout({ children }: LayoutProps<"/">) {
  return (
    <Shell lang="en">
      <QuickExit />
      {children}
    </Shell>
  );
}
