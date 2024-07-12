import UserProjects from "./components/UserProjects";

const Projects = async () => {
  return (
    <div className="mt-4">
      <h1 className="mb-4 text-xl font-semibold">My Projects</h1>
      <UserProjects />
    </div>
  );
};

export default Projects;
