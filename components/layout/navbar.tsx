import Link from "next/link";
import NavButton from "@/components/layout/nav-button";

export default function Navigation() {
  return (
    <nav className="py-4 px-8 bg-brand-light border-be border-brand-border items-center flex flex-row full-w justify-between font-sans">
      <Link href={"/"}>
        <p className="text-xl font-bold text-brand-navy">
          Social life in person
        </p>
        <p className="hidden md:block text-slate-600">
          Manage and find events of all sorts near you.
        </p>
      </Link>
      <NavButton
        href="/events/new"
        className="btn btn-primary min-h-10 rounded-xl px-4"
      >
        Create event
      </NavButton>
    </nav>
  );
}
