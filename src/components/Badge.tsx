import React from "react";
import { formatCount } from "../utils/format";

export function Badge({ n }: { n: number }) {
  return (
    <span className="inline-block rounded px-2 py-1 bg-gray-200 text-gray-700">
      {formatCount(n)}
    </span>
  );
}
