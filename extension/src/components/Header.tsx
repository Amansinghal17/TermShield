function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
          🛡️
        </div>

        <div>
          <h1 className="text-base font-bold text-white">
            TermShield
          </h1>
          <p className="text-[11px] text-slate-500">
            Legal Risk Protection
          </p>
        </div>
      </div>

      <button className="text-slate-400 hover:text-white">
        ⚙️
      </button>
    </header>
  );
}

export default Header;