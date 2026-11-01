import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "/map",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HomePage() {
  redirect("/map");
}
