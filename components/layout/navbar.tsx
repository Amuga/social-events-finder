import Link from "next/link";

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
      <Link
        href={"/events/new"}
        className="min-h-10 md:block px-4 btn btn-primary rounded-xl flex content-center"
      >
        Create event
      </Link>
    </nav>
  );
}
