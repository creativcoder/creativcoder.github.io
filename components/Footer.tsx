import { SiGithubsponsors } from "react-icons/si";

function License() {
  return (
    <div className="flex-col items-center justify-center mt-8 mb-8">
      <div className="text-center text-xs mx-auto">
        © 2016-{new Date().getFullYear().toString()} creativcoder. All rights
        reserved.
      </div>
    </div>
  );
}

function Sponser() {
  return (
    <div className="px-4 py-2 flex items-center justify-center space-x-2 border-2 rounded-md border-gray-500 hover:bg-blue-100 transition-colors hover:text-lime-900">
      <SiGithubsponsors />
      <p>Be a GitHub Sponser</p>
    </div>
  );
}

export const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center w-full">
        <Sponser />
        <License />
      </footer>
    </>
  );
};
