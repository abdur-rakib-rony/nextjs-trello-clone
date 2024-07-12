import UserProjects from "./components/UserProjects";

const Projects = async () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <h1 className="mb-4 text-xl font-semibold">My Projects</h1>
        <UserProjects />
      </div>
    </div>
  );
};

export default Projects;
