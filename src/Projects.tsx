import { useState, useEffect } from "react";
import type { SkillsType } from "./Types";

export function Projects() {
  const [data, setData] = useState<SkillsType | null>(null);

  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch("./information.json")
      .then((information) => information.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) return;

  return (
    <div className="relative grid p-5 lg:grid-cols-2 grid-cols-1 text-white">
      <div id="projects" className="absolute -top-25"></div>
      {Object.values(data.projects).map((project, index) => {
        return (
          <div key={`${index}+${project}`} className="flex flex-col gap-10 p-5">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-auto mt-auto text-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold hover:text-blue-500 bitcount-single-bold border-b-2 border-dotted"
                >
                  {project.title}
                </a>
              </div>
            </div>

            <div className="mb-auto mt-auto flex flex-col md:flex-row gap-8 items-center">
              <img src={`${baseUrl}${project.picture}`} className="h-40 w-70" />
              <h1 className="text-1xl flex-1 bitcount-single-bits">
                {project.description}
              </h1>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-2 gap-10">
              {Object.entries(project.technologies).map(([key, value]) => {
                return (
                  <div key={`${key}${value}`} className="flex gap-3">
                    <img
                      className="w-10 h-10 object-contain"
                      src={`${baseUrl}${value}`}
                    ></img>
                    <h1 className="bitcount-single-bits ">{key}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
