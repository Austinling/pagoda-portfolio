export function Navbar() {
  return (
    <nav className="border-b-white border-b-3 p-5 sticky z-100 top-0 bg-black flex leading-none items-baseline cursor-pointer">
      <a href="#start" className="ultra-regular">
        Aung Myat
      </a>
      <div className="flex flex-1"></div>
      <div className="flex gap-10 special-elite-regular">
        <a href="#teckstack">Tech Stack</a>
        <a href="#projects">Projects</a>
        <a href="#aboutme">About Me</a>
      </div>
    </nav>
  );
}
