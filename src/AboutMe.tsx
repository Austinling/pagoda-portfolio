export function AboutMe() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-10">
      <img className="w-100 mx-auto" src="./images/profileImage.jpg" />
      <div className="flex flex-col gap-10 text-white p-5">
        <h3 className="bitcount-single-bold text-3xl">About Me</h3>
        <p className="bitcount-single-bits">
          Hi! I'm Austin, a Computer Science and AI student at the University of
          Sheffield. I am a full-stack developer and hackathon winner with a
          passion for building high-performance, real-time applications. From
          creatinginteractive UIs in TypeScript to developing data-driven admin
          dashboards, I love turning complex logic into seamless user
          experiences and am always looking for the next technical challenge to
          solve.
        </p>
      </div>
    </div>
  );
}
