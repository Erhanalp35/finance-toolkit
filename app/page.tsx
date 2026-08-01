import type { Metadata } from "next";
import FinoraApp from "./FinoraApp";

export const metadata: Metadata = {
  title: "Finora — Your money, finally clear",
  description: "Budgeting, analytics, goals and financial calculators for your whole financial life.",
};

export default function Home() { return <FinoraApp />; }
