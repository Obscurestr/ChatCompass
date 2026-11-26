"use client";

import { en } from "../copy/en";
import type { Risk, WarningSign } from "../lib/schema";
import BottomSheet from "./BottomSheet";

// T018 — bottom sheet with one sign's explanation.
export default function SignSheet({
  sign,
  risk,
  onClose,
}: {
  sign: WarningSign | null;
  risk: Risk;
  onClose: () => void;
}) {
  const markColor = risk === "high" ? "bg-marker-rose" : "bg-marker-yellow";

  return (
    <BottomSheet open={sign !== null} onClose={onClose} labelledBy="sign-title" title={sign?.title}>
      {sign?.quote && (
        <p className="mt-4">
          <span className={`rounded-mark px-1 [box-decoration-break:clone] ${markColor}`}>&ldquo;{sign.quote}&rdquo;</span>
        </p>
      )}
      <p className="label-doodle mt-6">{en.signSheet.why}</p>
      <p className="mt-1">{sign?.explanation}</p>
    </BottomSheet>
  );
}
