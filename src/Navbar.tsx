export function Navbar() {
  return (
    <nav className="border-b-white border-b-3 p-5 sticky top-0 bg-black flex leading-none items-baseline cursor-pointer">
      <h1 className="ultra-regular">Aung Myat</h1>
      <div className="flex flex-1"></div>
      <div className="flex gap-10 special-elite-regular">
        <a>Tech Stack</a>
        <a>Projects</a>
        <a>About Me</a>
      </div>
    </nav>
  );
}
